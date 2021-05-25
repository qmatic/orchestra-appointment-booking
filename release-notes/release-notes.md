<h1>Release notes Appointment Booking App 4.0.0</h1>

----------

<h2>Introduction</h2>

This document describes the new features, bug corrections, known issues and recommendations for Appointment Booking App 4.0.0. If you want to know about connector changes details or similar, this document is for you.

**Note:** Several of the remarks refer to a Jira number (Jira is Qmatic&#39;s internal registration system for bugs), or Pivotal Tracker (internal system for improvements and other issues).


<!--Add new update section after each release

<h2>Version UPDATE_VERSION_NUMBER</h2>

**Date:**
 
**Build number:**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **xxx** | **Story header** Solution text |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **xxx** | **Bug header** Solution text |

<h3>Known issues</h3>

| **Id/Jira** | **Description** |
| --- | --- |
| **xxx** | **Bug header** Bug text |

<h3>Upgrade instructions</h3> 

------------>

<h2>Update 4.0.0.019-internal </h2>

**Date: 25/5/2021**
 
**Build number: 019**

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **AB-275** | **Cannot view booked appointments if an appointment created from calendar with a note containing space character** |

----------

<h2>Update 4.0.0.018 </h2>

**Date: 7/5/2021**
 
**Build number: 018**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-8424** | **Appointment History in Appointment Booking** |
| **AB-189** | **Appointment List- Create new UI and integration with Appointment booking** |
| **AB-263** | **Visualize History audit and possibility to drill down on history** |
| **AB-261** | **Implement a Loader for Appointment History** |
| **AB-262** | **Implement a Loader for Appointment List** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **AB-276** | **Character decording is not working in Notes and Title fields** |

<h3>Upgrade instructions</h3> 
To use the Appointment List and Appointment History Audit module, there are two settings under General section in settings page and wants to enable.

----------

<h2>Update 4.0.0.017 </h2>

**Date: 09/02/2021**
 
**Build number: 017**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **AB-151** | **Phone validation differs between AB and QWB** |
| **AB-60** | **Re-send appointment confirmation from Appointment Booking** |
| **AB-248** | **Use system parameter for date** |
| **AB-254** | **Use system parameter for date - Appointment List** |


<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **AB-148** | **Appointment booking scaling issues fixed** |
| **AB-177** | **Phone validation issue when a default country code is set & phone no field set as optional** |
| **AB-176** | **Stat event enabled > Book appointments are empty when customer search soon after an appointment creation bug fixed** |
| **AB-176** | **When the address is too long, it's not fully visible in the UI** |
| **AB-193** | **MAC+Safari UI issue - Address and resource are not visible.** |

<h3>Upgrade instructions</h3> 

----------

<h2>Update 4.0.0.016 </h2>

**Date: 21/1/2021**
 
**Build number: 016**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **AB-138** | **Add QR code and Service templates to printed confirmation** |
| **AB-139** | **Add extra information as customer info** |


<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **AB-161** | **Handle Backward compatibility for older Notification module** |
| **AB-168** | **External notes - Support for line breaks** |
| **AB-169** | **External notes - support for special characters** |


<h3>Upgrade instructions</h3> 
To use the email templete printing and customer notes, customized notifcation module -  GL_Notification 1.8 should be used. Refer README section for more information.

----------

<h2>Update 4.0.0.015 </h2>

**Date: 18/12/2020**
 
**Build number: 015**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **AB-61** | **Customer language selection in customer creation** |
| **AB-79** | **Update angular version 5.2 to 10 and gulp version 3 to 4** |
| **AB-126** | **Not possible to add a customer with an email address for a Top Level Domain with more than 4 characters.** |
| **AB-131** | **Filter default language from notification language dropdown.** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **AB-108** | **Hide the prefix when phone number is empty** |
| **AB-103** | **Customer phone number just only show the prefix bug fixed** |
| **AB-129** | **Appointment booking artifactory build task failing issue fixed** |
| **AB-134** | **DOB and Language settings automatically checked after save the settings page issue fixed** |

<h3>Upgrade instructions</h3> 
To use the customer notification language , customized notifcation module should be used. 

----------
<h2>Update 4.0.0.014</h2>

**Date: 11/09/2020**
 
**Build number: 014**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **AB-62** | **Set appointment creation source in Appointment Booking** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **AB-49** | **Month selection hiding issue fixed** |

----------

<h2>Update 4.0.0.013</h2>

**Date: 26/08/2020**
 
**Build number: 013**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **AB-62** | **Set appointment creation source in Appointment Booking** |

----------

<h2>Update 4.0.0.012</h2>

**Date: 24/10/2018**
 
**Build number: 012**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **161107898** | **AM/PM & 24 hour** Now using centralized time convention setting in orchestra |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **AB-48** | **Build fails on case sensitive systems** Corrected import of settings.json |

<h3>Known issues</h3>

<h3>Upgrade instructions</h3> 

----------

<h2>Update 4.0.0.011</h2>

**Date: 12/10/2018**
 
**Build number: 011**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **161047690** | **Make workstationterminal.war compatible between current Orchestra 7.0 (4.0.0.418) and future 7.1** Update web.xml |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **xxx** | **xxx** |

<h3>Known issues</h3>

<h3>Upgrade instructions</h3> 

----------

<h2>Update 4.0.0.010</h2>

**Date: 06/09/2018**
 
**Build number: 010**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **xxx** | **xxx** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **AB-44** | **Issues with visual counting down reservation time in appointment manager** |
| **AB-47** | **The days in Appointment History does not take the localisationinto account** | Changed date printing in booking history, booking dropdown and appointment edit card |

<h3>Known issues</h3>

<h3>Upgrade instructions</h3> 

----------

<h2>Update 4.0.0.009</h2>

**Date: 19/07/2018**
 
**Build number: 009**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **158717542** | **Remove jar files from web app** |
| **158450685** | **Edit Appointment - One toast instead of two** |
| **158351475** | **Add x to close the print view** |
| **158212709** | **Back button in browser shall redirect to HOME page** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **AB-36** | **Clear all button not available if only print icon and notificaiton method checked** |
| **AB-37** | **Settings page > "Max no of customers" should be validated.** |

<h3>Known issues</h3>

<h3>Upgrade instructions</h3> 

----------

<h2>Update 4.0.0.008</h2>

**Date: 18/07/2018**
 
**Build number: 008**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **xxx** | **Story header** Story text |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **AB-42** | **Print customer copy shows incorrect time for a booking in a different timezone** |

<h3>Known issues</h3>

<h3>Upgrade instructions</h3> 

----------

<h2>Original release</h2>

**Date: 10/01/2018** 
 
**Build number: 001** 

----------


<h3>Copyright notice</h3>

The information in this document is subject to change without prior notice and does not represent a commitment on the part of Q-MATIC AB. All efforts have been made to ensure the accuracy of this manual, but Q-MATIC AB cannot assume any responsibility for any errors and their consequences. 

This manual is copyrighted and all rights are reserved. 
Qmatic and Qmatic Orchestra are registered trademarks or trademarks of Q-MATIC AB. 
Reproduction of any part of this manual, in any form, is not allowed, unless written permission is given by Q-MATIC AB.
COPYRIGHT (c) Q-MATIC AB, 2018.

