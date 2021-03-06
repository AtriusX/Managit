import { Command }     from "..";
import { AccountType } from "../../auth/";
import { config }      from "../../config";
import { input }       from "../../util";
import { msg }         from "../../util/Msg";

export class EditAccount implements Command {
  command: string = 'edit-account';

  async run(): Promise<void> {
    let names = config.getAccountNames();
    let selection = await input.pick(
      names, 'Pick an account'
    );

    let account = config.getAccount(selection!);
    if (!account) return;

    let item = await input.pick(account.type === AccountType.USER ?
      ['Username', 'Password'] : ['Name', 'Token'], 'Pick a field to edit'
    );
    if (!item) return;

    let isToken = ['Password', 'Token'].includes(item);
    let val = await input.input(
      `Enter the new ${item.toLowerCase()} for the account`
    );

    if (val) {
      isToken ? account.key = val : account.name = val;
      // Update user account
      config.updateAccount(account, names.indexOf(account.name));
      msg.info(`Updated account data for ${selection}`);
    }
  }
}