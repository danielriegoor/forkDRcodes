## README-MS-Outlook.md

* To perform a similar process to Google Takeout (data export) in Hotmail (now Outlook.com), you will need to use the mailbox export functionality that Microsoft offers. The process is slightly different from Google Takeout, but the goal is the same: to obtain a copy of your emails.

# Exporting Your Emails from Outlook.com (Hotmail)
* Microsoft allows you to export your mailbox as a .pst file. This file contains your emails, calendars, and contacts.

* Access Outlook.com Settings:

* Log in to your Outlook.com account.
  In the upper right corner, click the gear icon (Settings).
  In the panel that opens, click "View all Outlook settings" at the bottom.

* Go to Export Options:
  In the settings menu, select "General".
  Then, click "Privacy and data".

* You will see an option like "Export mailbox" or "Export my email". Click on it.

# Confirm Export:

* Outlook.com will ask you to confirm that you want to export your mailbox. Follow the on-screen instructions.

* You may need to verify your identity (for example, by using a code sent to your phone or alternative email).

* Wait and Download the File:

* Microsoft will process your request. This can take up to 4 days, depending on the volume of emails you have.

* You will receive an email in your Outlook.com inbox (or in the security email associated with your account) with a link to download the .pst file when the export is ready.

# Click the link to download the file.

## Processing .pst Files to Extract Domains
Unlike Google Takeout's .mbox files, .pst files are a proprietary Microsoft format and are more complex to process directly with simple Python scripts without specific libraries.

* To work with .pst files, you will generally need:

* An email client that can open .pst: The most common is Microsoft Outlook (desktop application). You can open the .pst file in Outlook to browse your emails and, from there, copy/observe the domains manually.

* Specialized Python libraries: There are some third-party Python libraries (such as pypff or pst-parser) that can attempt to read .pst files, but they are more complex to set up and use, and may not be 100% reliable for all .pst formats. The complexity of use is significantly greater than with .mbox files.

* There is no simple and direct Python code like the one I provided for .mbox that is easily applicable for .pst without installing complex external libraries that are sometimes difficult to compile or have compatibility issues.

## Simplest Way for Outlook.com/Hotmail
The simplest way to extract domains from Outlook.com emails, without delving into .pst file programming, is to use the rules functionality directly in Outlook.com, similar to Gmail.

1. Folder Creation:

Create the desired folders (OLX, Banks, etc.) directly in Outlook.com.

2. Rule Creation (Filters):

In Outlook.com, go to Settings (gear icon) > View all Outlook settings.

Go to "Mail" > "Rules".

Click "Add new rule".

Rule name: Give it a name (e.g., "OLX").

Add a condition: Select "From" and type the domain (e.g., @olx.com.br).

Add an action: Select "Move to" and choose the desired folder.

Click "Save".

3. Manual Domain Identification:

The best way to identify domains for creating rules is to browse your Outlook.com inbox, observe the emails you receive, and note the domains of the senders you want to organize.

You can use the Outlook.com search bar to look for emails from specific senders and check their domains.

Given the complexity of .pst files, I strongly recommend the approach of creating rules directly in Outlook.com and manually identifying the domains as the simplest and most effective way to organize your Hotmail/Outlook.com inbox.