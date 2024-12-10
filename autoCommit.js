const { exec } = require('child_process');

// Function to run a command and return a promise
function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}

// Main function to automate git commit
async function autoCommit() {
    try {
        // Check for changes
        const status = await runCommand('git status --porcelain');
        if (status) {
            // Generate commit message
            const commitMessage = `Auto commit at ${new Date().toISOString()}`;

            // Add changes
            await runCommand('git add .');

            // Commit changes
            await runCommand(`git commit -m "${commitMessage}"`);

            // Push changes
            await runCommand('git push');
            console.log('Changes committed and pushed successfully.');
        } else {
            console.log('No changes to commit.');
        }
    } catch (error) {
        console.error('Error during git commit:', error);
    }
}

// Run the autoCommit function every 10 minutes (600000 milliseconds)
setInterval(autoCommit, 1800000);