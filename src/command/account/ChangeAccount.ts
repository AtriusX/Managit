import { Command } from "..";
import { github }  from "../../github";
import { window }  from "vscode";
import { Config } from "../config";

export class ChangeAccount implements Command {
    command: string = 'change-account';

    async run(): Promise<void> {
        let selection = await window.showQuickPick(
            Config.getAccountNames()
        );

		if (selection) {
			Config.currentAccount(selection);
			window.showInformationMessage(`Set active account to ${selection}`);
		}
    }
}