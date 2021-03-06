import { Command }          from '..';
import { github }           from '../../github';
import { window, commands } from 'vscode';
import { input }            from '../../util';
import { msg }              from '../../util/Msg';

export class CreateRepository implements Command {
  command: string = 'create-repository';

  async run(): Promise<void> {
    // Get repository properties
    let name = await input.input('Type in the name of your repository');
    if (!name) return;

    let desc = await input.input('Type in the description for your repository');
    
    let visibility = await input.booleanChoice('Yes', 'No', 'Make repository private?');
    if (visibility === undefined) visibility = false;

    let init = await input.booleanChoice('Yes', 'No', 'Auto initialize?');
    if (init === undefined) init = false;

    let account = github.currentAccount.login();
    account.repos.createForAuthenticatedUser({
      name: name, description: desc,
      private: visibility, auto_init: init
    }).then((result) => {
      msg.button(`Created repository '${name}'`, 'Clone', () => {
        commands.executeCommand('git.clone', result.data.url).then(() => {
          msg.info('Repository cloned');
        });
      });
    });
    // TODO auto clone repository and open it
  }
}