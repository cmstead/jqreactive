const ToDoForm = (function () {
    const { component } = jqreactive;

    function ToDoForm() {
        this.state = {
            toDoItem: ''
        };
    }

    ToDoForm.prototype = {
        handleKeyUp: function (event) {
            const { name, value } = event.target;

            this.updateState({
                [name]: value
            });
        },
        addToDo: function (event) {
            event.preventDefault();

            this.props.addToDoItem({
                text: this.state.toDoItem,
                complete: false
            });

            this.setState({
                toDoItem: ''
            })
        },
        render: function () {
            return this.renderView(`
                <form submit="addToDo">
                    <section class="form-group">
                        <input type="text" name="toDoItem" value="${this.state.toDoItem}" keyup="handleKeyUp">
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