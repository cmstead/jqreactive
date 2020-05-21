const jqreactive = (function () {

    const eventNames = [
        'blur',
        'change',
        'click',
        'focus',
        'keydown',
        'keyup',
        'mousedown',
        'mouseup',
        'submit'
    ];

    function BaseComponent() {
        this._currentView = null;
        this.props = null;
        this.components = {};

        this._decorateRender(this.render);
    }

    BaseComponent.prototype = {
        renderView: function (viewString, renderProps) {
            const view = $(viewString);

            this._attachEventListeners(view);
            this._populate(view, renderProps);

            return view;
        },

        updateState: function (newState) {
            Object.keys(newState)
                .forEach(this._updateStateValue(newState));
        },

        setState: function (newState) {
            this.updateState(newState);

            this.render(this.props);
        },

        _decorateRender: function (render) {
            this.render = (props = null) => {
                this._updateCurrentProps(props);
                
                const view = render.call(this, props);

                this._updateCurrentView(view);

                return view;
            };
        },

        _updateCurrentProps: function (props) {
            this.props = props;
        },

        _updateCurrentView: function (view) {
            $(this._currentView).replaceWith(view);
            this._currentView = view;
        },

        _populate: function (view, renderProps = {}) {
            const getPropsName = (element) => $(element).attr('props');
            const getElementProps = (element) => renderProps[getPropsName(element)];

            const loadRenderedComponent = (subComponent) => (_, element) =>{
                const propsName = getPropsName(element);
                const elementProps = getElementProps(element);

                $(element).replaceWith(render(subComponent, elementProps))
            };

            const renderSubComponents = (componentName) =>
                $(view)
                    .find(componentName)
                    .each(loadRenderedComponent(this.components[componentName]));

            Object.keys(this.components).forEach(renderSubComponents);
        },

        _getEventTarget: function (event) {
            return event.target
                ? event.target
                : event.currentTarget;
        },

        _attachEventListener: function (eventName, element) {
            const behaviorName = $(element).attr(eventName);

            $(element).on(eventName, (event) => {
                event.target = this._getEventTarget(event);

                this[behaviorName](event);
            });
        },

        _attachEventListeners: function (view) {
            eventNames.forEach((eventName) => {
                if (typeof $(view).attr(eventName) !== 'undefined') {
                    this._attachEventListener(eventName, view)
                }

                $(view).find(`[${eventName}]`)
                    .each((index, element) =>
                        this._attachEventListener(eventName, element));
            });
        },

        _throwOnBadStateKey: function (stateKey) {
            if (typeof this.state[stateKey] === 'undefined') {
                throw new Error(`No state value found for ${stateKey}`);
            }
        },

        _updateStateValue: function (newState) {
            return (stateKey) => {
                this._throwOnBadStateKey(stateKey);

                this.state[stateKey] = newState[stateKey];
            }
        }
    };

    function attachPropertiesToPrototype(newPrototype, NewComponent) {
        Object.keys(NewComponent.prototype)
            .forEach(function (key) {
                newPrototype[key] = NewComponent.prototype[key];
            });
    }

    function buildNewBaseComponent(NewComponent) {
        function Component() {
            BaseComponent.call(this);
            NewComponent.call(this);

            this.name = NewComponent.name;
        }

        Component.prototype = Object.create(BaseComponent.prototype);

        return Component;
    }

    function extendBaseComponent(NewComponent) {
        const Component = buildNewBaseComponent(NewComponent);

        attachPropertiesToPrototype(Component.prototype, NewComponent);

        return Component;
    }

    function component(NewComponent) {
        return extendBaseComponent(NewComponent);
    }

    function render(Component, props = null) {
        return (new Component()).render(props);
    }

    function bootstrap(appRootSelector, AppComponent) {
        $(appRootSelector).append(render(AppComponent));
    }

    function buildPropsFromValues(listValues, keyBase, propsBuilder){
        return listValues.reduce(
            (newProps, listValue, index) =>
                ({
                    ...newProps,
                    [keyBase + index]: propsBuilder(listValue, index)
                }),
                {}
        );
    }

    return {
        buildPropsFromValues,
        bootstrap,
        component
    }
})();