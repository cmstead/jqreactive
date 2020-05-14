const jqreactive = (function () {

    function BaseComponent() {
        this.lastView = null;
        this.props = null;
        this.renderProps = null;
        this.components = {};

        const render = this.render;

        this.render = (props = null) => {
            this.props = props;

            const view = render.call(this, props);

            $(this.lastView).replaceWith(view);
            this.lastView = view;

            return view;
        }
    }

    BaseComponent.prototype = {
        renderView: function (viewString, renderProps) {
            const view = $(viewString);

            this.attachEventListeners(view);

            return this.populate(view, renderProps);
        },

        populate: function (view, renderProps = {}) {
            Object.keys(this.components)
                .forEach((componentName) => {
                    const subComponent = this.components[componentName];

                    $(view)
                        .find(componentName)
                        .each((_, element) => {
                            const propsName = $(element).attr('props');
                            const elementProps = renderProps[propsName];

                            // Drop in rendered component to replace placeholder
                            $(element).replaceWith(render(subComponent, elementProps))
                        });
                });


            return view;
        },

        getEventTarget: function (event) {
            return event.target ? event.target : event.currentTarget;
        },

        attachEventListeners: function (view) {
            const eventNames = [
                'change',
                'click',
                'keyup',
                'keydown',
                'submit'
            ];

            const attachEventListener = (eventName, element) => {
                const behaviorName = $(element).attr(eventName);

                $(element).on(eventName, (event) => {
                    event.target = this.getEventTarget(event);

                    // THIS will get you every time!
                    this[behaviorName](event);
                });
            }

            eventNames.forEach((eventName) => {
                if (typeof $(view).attr(eventName) !== 'undefined') {
                    attachEventListener(eventName, view)
                }

                $(view).find(`[${eventName}]`)
                    .each((index, element) => {
                        attachEventListener(eventName, element);
                    });
            });
        },

        updateState: function (newState) {
            const state = this.state;

            Object.keys(newState)
                .forEach((stateKey) => {
                    if (typeof state[stateKey] === 'undefined') {
                        throw new Error(`No state value found for ${stateKey}`);
                    }

                    state[stateKey] = newState[stateKey];
                });
        },

        setState: function (newState) {
            this.updateState(newState);

            this.render(this.props);
        }
    };

    function component(NewComponent) {

        function Component() {
            BaseComponent.call(this);
            NewComponent.call(this);
        }

        Component.prototype = Object.create(BaseComponent.prototype);

        Object.keys(NewComponent.prototype)
            .forEach(function (key) {
                Component.prototype[key] = NewComponent.prototype[key];
            });

        return Component;
    }

    function render(Component, props = null) {
        return (new Component()).render(props);
    }

    function appendAll(parentElement, values, mappingFn) {
        values.forEach(function (value, index) {
            parentElement.append(mappingFn(value, index));
        })
    }

    function bootstrap(appRootSelector, AppComponent) {
        $(appRootSelector).append(render(AppComponent));
    }

    return {
        appendAll,
        bootstrap,
        component,
        render
    };
})();