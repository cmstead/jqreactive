const ToDoItemDisplay = (function () {
    const { component } = jqreactive;

    function ToDoItemDisplay() { }

    ToDoItemDisplay.prototype = {
        toggleCompleteStatus: function () {
            this.props.toggleCompleteStatus(this.props.index);
        },

        deleteToDoItem: function (event) {
            event.preventDefault();

            console.log(this.props.deleteToDoItem);
            this.props.deleteToDoItem(this.props.index);
        },

        render: function (props) {
            return this.renderView(
                `<input
                        type="checkbox" 
                        ${props.item.complete ? 'checked="checked"' : ''}
                        click="toggleCompleteStatus"
                    > ${props.item.text} <a href="#nowhere" click="deleteToDoItem">Delete</a>`
            )

        }
    };

    return component(ToDoItemDisplay);
})();