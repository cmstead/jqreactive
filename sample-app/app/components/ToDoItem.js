const ToDoItem = (function () {
    const { component } = jqreactive;

    function ToDoItem() {}

    ToDoItem.prototype = {
        toggleCompleteStatus: function() {
            this.props.toggleCompleteStatus(this.props.index);
        },
        render: function(props) {
            return this.renderView(
                `<li><input
                    type="checkbox" 
                    ${props.item.complete ? 'checked="checked"' : ''}
                    click="toggleCompleteStatus"
                /> ${props.item.text}</li>`
            )
        }
    }

    return component(ToDoItem);
})();