const app = Vue.createApp({
    data() {
        return {
            btnType: "submit",
            message: '',
            placeholder: "Введите текст",
            tasks: [
                { id: 1, text: "Задача 1", done: false, taskLikes: 0, taskDislikes: 0 },
                { id: 2, text: "Задача 2", done: true, taskLikes: 0, taskDislikes: 0 },
                { id: 3, text: "Задача 3", done: true, taskLikes: 0, taskDislikes: 0 },
            ],
            nextId: 4,
            titleLikes: 0,
            titleDislikes: 0,
            formLikes: 0,
            formDislikes: 0,
            taskLikes: 0,
            taskDislikes: 0,
        };
    },
    computed: {
        count() {
            return this.tasks.filter(task => !task.done).length;
        },
        doneTasks() {
            return this.tasks.filter(task => task.done);
        },
        undoneTasks() {
            return this.tasks.filter(task => !task.done);
        },
    },
    methods: {
        addTask() {
            this.tasks.push({
                id: this.nextId++,
                text: this.message,
                done: false,
                taskLikes: this.taskLikes,
                taskDislikes: this.taskDislikes,
            });
            this.message = '';
        },
    }
});

app.component('reactions', {
    props: ['likes', 'dislikes'],
    template: `
    <div class="reactions">
      <button type="button" class="btnReaction btnLike" @click="incrementLikes">&#x1f44d;{{ likes }}</button>
      <button type="button" class="btnReaction btnDislike" @click="incrementDislikes">&#x1f44e;{{ dislikes }}</button>
    </div>
    `,
    methods: {
        incrementLikes() {
            this.$emit('update:likes', this.likes + 1);
        },
        incrementDislikes() {
            this.$emit('update:dislikes', this.dislikes + 1);
        }
    }
});

app.component('task-list', {
    props: ['tasks', 'title'],
    template: `
     <ul class="list">
      <h2 v-if="title">{{title}}</h2>
      <li class="item" v-for="task in tasks" :key="task.id">
        <input type="checkbox" v-model="task.done">
        <span :class="{done:task.done}">{{task.text}}</span>
        <reactions v-model:likes="task.taskLikes" v-model:dislikes="task.taskDislikes"></reactions>
      </li>
     </ul>
    `
});

app.mount('#app');