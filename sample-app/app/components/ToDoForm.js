const ToDoForm = (function () {
    const { component } = jqreactive;

    function ToDoForm() {
        this.state = stateService.getStateObject('ToDoForm', {
            toDoItem: ''
        });

        this.state.onSet((newState) => this.setState(newState));
        this.state.onUpdate((newState) => this.updateState(newState));
    }

    ToDoForm.prototype = {
        handleKeyUp: function (event) {
            const { name, value } = event.target;

            this.state.update({
                [name]: value
            })
        },
        addToDo: function (event) {
            event.preventDefault();

            this.props.addToDoItem({
                text: this.state.toDoItem,
                complete: false
            });

            this.state.set({
                toDoItem: ''
            })
        },
        render: function () {
            return this.renderView(`
                <form submit="addToDo">
                    <section class="form-group">
                        <input 
                            type="text"
                            name="toDoItem" 
                            value="${this.state.toDoItem}" 
                            keyup="handleKeyUp">
                    </section>
                    <section class="form-group">
                        <button>Add it!</button>
                    </section>
                </form>
            `);
        }
    };

    return component(ToDoForm);
})();