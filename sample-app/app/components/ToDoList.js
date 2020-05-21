const ToDoList = (function () {
    const { buildPropsFromValues, component } = jqreactive;

    function ToDoList() {
        this.components = {
            ToDoItem
        };
    }

    ToDoList.prototype = {
        buildToDoProp: function (props) {
            return (toDoItem, index) => ({
                item: toDoItem,
                index: index,
                toggleCompleteStatus: props.toggleCompleteStatus,
                deleteToDoItem: props.deleteToDoItem
            });
        },

        render: function (props) {
            return this.renderView(`
                <ul id="to-do-list">
                    ${
                props.toDoItems.map((_, index) =>
                    `<ToDoItem props="${ToDoItem.name + index}"></ToDoItem>`)
                    .join('\n')
                }
                </ul>
                `,
                buildPropsFromValues(props.toDoItems, ToDoItem.name, this.buildToDoProp(props))
            );
        }
    };

    return component(ToDoList);
})();