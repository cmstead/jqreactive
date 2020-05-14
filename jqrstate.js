const jqrstate = (function () {
    const stateDictionary = {};

    function updateStateValues(stateObject, newState) {
        Object.keys(newState)
            .forEach(key => stateObject[key] = newState[key]);
    }

    function State(initialState) {
        updateStateValues(this, initialState);

        this.setHandler = () => null;
        this.updateHandler = () => null;
    }

    State.prototype = {
        set: function (newState = {}) {
            updateStateValues(this, newState);

            this.setHandler(newState);
        },
        update: function(newState = {}) {
            updateStateValues(this, newState);

            this.updateHandler(newState);
        },

        onSet: function(setHandler) {
            this.setHandler = setHandler;
        },
        onUpdate: function(updateHandler) {
            this.updateHandler= updateHandler
        }
    }

    function getStateObject(stateName, initialState = {}) {
        if (typeof stateDictionary[stateName] === 'undefined') {
            stateDictionary[stateName] = new State(initialState);
        }

        return stateDictionary[stateName];
    }

    return {
        getStateObject
    };
})();