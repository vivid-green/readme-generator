const licenses =  require("./licenses");

const questions = [
    {
        type: "input",
        name: "Title",
        message: "What is the title of your project?"
    },
    {
        type: "input",
        name: "Description",
        message: "What does your project do?"
    },
    {
        type: "input",
        name: "Installation",
        message: "How do you install your project?"
    },
    {
        type: "input",
        name: "Usage",
        message: "How do you use your project?"
    },
    {
        type: 'checkbox',
        name: 'License',
        message: 'What license(s) is your project covered under?',
        choices: Object.keys(licenses),
    },
    {
        type: "input",
        name: "Contributing",
        message: "How can one contribute to your project?"
    },
    {
        type: "input",
        name: "Tests",
        message: "How do you run your project code?"
    },
    {
        type: "input",
        name: "Questions",
        message: "What is your GitHub username?"
    },
    {
        type: "input",
        name: "Email",
        message: "What is your email address?"
    },
];

module.exports = questions;
