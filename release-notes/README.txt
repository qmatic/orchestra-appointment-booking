How to handle the release-notes.md file
=======================================


1. What is this?
----------------
This document helps you understand how to use the Release Notes for this version of Staff Booking App.


2. New major release
--------------------
2.1 Replace the existing release-notes.md file with the template-release-notes.md file. Don't remove the template file.
2.2 Update the date , Build Number and Version Number in this new release-notes.md file.
2.3 Add entries to it, following the standards provided in the template.


3. Updates to a Major Orchestra Version
---------------------------------------
3.1 Copy the commented 'update section' in the release-notes.md file and place it appropriately.
3.2 Uncomment the copied section (preserving the original commented update section template) and modify as needed.


4. How to update the release-notes.md (Markdown) file?
------------------------------------------------------
You can update the release-notes.md file by following the format and syntax provided in the template-release-notes.md file. Here are a few examples:
- ADD A NEW FEATURE:
Append a new line below the last row of the table under the "Stories" header with the following format:
| **Pivotal story id** | **Story title** <Solution description> |

-ADD A NEW BUG FIX:
Append a new line below the last row of the table under the "Bug Fixes" header with the following format:
| **Jira Id** | **Story title** <Solution description> |

-ADD A KNOWN ISSUE:
Append a new line below the last row of the table under the "Known Issues" header with the following format:
| **Jira Id** | **Story title** <Bug description> |

-MODIFY THE UPGRADE INSTRUCTIONS:
Use **<list item number>** to emphasize the new instruction number. Use '-' (with a space after the hyphen) to create an unordered list item.



