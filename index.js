const questions = require("./questions");
const licenses = require("./licenses");
const inquirer = require("inquirer");
const fs = require("fs");
const filename = "README.md";

const promptUser = _ => inquirer.prompt(questions);

const init = _ => {
    promptUser()
    .then(buildMarkdown)
    .then(writeReadme)
    .catch(err => {
        console.log(err);
    });
};

const writeReadme = markdown => {
    return new Promise((resolve,reject) => {
        fs.writeFile(filename, markdown, 'utf8', (err) => {
            if(err) {
                return reject(err);
            }
        });
        resolve(printASCII("success"));
    });
}

const printASCII = msgFile => {
    fs.readFile(`./${msgFile}.txt`, function(err, buf) {
        console.log(buf.toString());
    });
}

const buildMarkdown = answers => {
    return new Promise((resolve,reject) => {
        if(!answers) {
            return reject("No answers found.");
        }
        let toc = ``;
        let markdown = ``;
        const answerKeys = Object.keys(answers);
        answerKeys.map(key => {
            if(key === "Email") return false;
            toc += `* [${key}](#${key})\n`
        })
        answerKeys.map(key => {
            if(key === "License") {
                markdown += `\n# ${key}\nThis work is licensed under the following:\n`;
                for(value of answers.License) {
                    markdown += `* [${value}](${licenses[value].link})\n`
                }
            } else if (key === "Email") {
                markdown += `\nEmail me with questions: ${answers[key]}\n`;
                return false;
            } else if (key === "Questions") {
                markdown += `\n# ${key}\n`;
                markdown += `\n[Click Here to Visit my GitHub](https://github.com/${answers[key]})\n`;
            } else {
                markdown += `\n# ${key}\n${answers[key]}\n`;
            }
            if(key === "Description") {
                markdown += `\n`
                for(value of answers.License) {
                    // console.log(licenses[value]);
                    markdown += ` ${licenses[value].badge} `
                }
                markdown += `\n# Table of Contents\n${toc}`; 
            }
        });
        resolve(markdown);
    })
};

init();