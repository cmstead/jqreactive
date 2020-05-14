const App = (function () {
    const { component } = jqreactive;

    function App() {
        this.components = {
            ToDoForm,
            ToDoList
        };

        this.state = {
            toDoItems: []
        };
    }

    App.prototype = {
        addToDoItem: function (toDoItem) {
            this.setState({
                toDoItems: this.state.toDoItems.concat(toDoItem)
            });
        },
        toggleCompleteStatus: function(index) {
            const complete = this.state.toDoItems[index].complete;
            this.state.toDoItems[index].complete = !complete;

            this.setState({});
        },
        render: function () {
            const view = this.renderView(
                `
                <div>
                    <h1>To Do List</h1>
                    <ToDoForm props="toDoForm"></ToDoForm>
                    <ToDoList props="toDoList"></ToDoList>
                <div>
                `,
                {
                    toDoForm: {
                        addToDoItem: (toDoItem) => this.addToDoItem(toDoItem)
                    },
                    toDoList: {
                        toDoItems: this.state.toDoItems,
                        toggleCompleteStatus: (index) => this.toggleCompleteStatus(index)
                    } 
                }
            );

            return view
        }
    };

    return component(App);
})();