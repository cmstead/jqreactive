const ToDoList = (function () {
    const { appendAll, component, render } = jqreactive;

    function ToDoList() {}

    ToDoList.prototype = {
        render: function(props) {
            const view = this.renderView(
                `<ul id="to-do-list"></ul>`
            );

            const renderToDoItem = (toDoItem, index) => render(ToDoItem, { 
                item: toDoItem,
                index: index,
                toggleCompleteStatus: props.toggleCompleteStatus,
                deleteToDoItem: props.deleteToDoItem
            });

            appendAll(view, props.toDoItems, renderToDoItem);

            return view;
        }
    };

    return component(ToDoList);
})();