const ToDoItem = (function () {
    const { component } = jqreactive;

    function ToDoItem() {
        this.components = {
            ToDoItemDisplay
        };

        this.state = {
            editMode: false
        }
    }

    ToDoItem.prototype = {
        render: function(props) {
            return this.renderView(
                `<li class="${props.item.complete ? 'complete' : ''}">
                    <ToDoItemDisplay props="ToDoItem"></ToDoItemDisplay>
                </li>`,
                { ToDoItem: props }
            )
        }
    }

    return component(ToDoItem);
})();