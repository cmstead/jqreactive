const ToDoItem = (function () {
    const { component } = jqreactive;

    function ToDoItem() {}

    ToDoItem.prototype = {
        toggleCompleteStatus: function() {
            this.props.toggleCompleteStatus(this.props.index);
        },
        deleteToDoItem: function(event) {
            event.preventDefault();
            
            this.props.deleteToDoItem(this.props.index);
        },
        render: function(props) {
            return this.renderView(
                `<li
                    class="${props.item.complete ? 'complete' : ''}"
                    ><input
                        type="checkbox" 
                        ${props.item.complete ? 'checked="checked"' : ''}
                        click="toggleCompleteStatus"
                    /> ${props.item.text} <a href="#nowhere" click="deleteToDoItem">delete</a></li>`
            )
        }
    }

    return component(ToDoItem);
})();