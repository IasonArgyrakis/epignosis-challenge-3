# Epignosis Challenge

PHP developer assignment

Purpose-Disclaimer The objective of this assignment is to gauge your technical skills, as well as to give us some
talking points for your technical interview. Note that the scope of the assignment is purely fictional. It is in no
capacity related to any part of our products and/or business nor will it ever be used commercially or otherwise in any
form.

Assignment overview You work for a company that has tripled in size over the past few years and the way the
vacation process works is no longer efficient, as it requires a combination of hand written applications, approvals,
storage and maintenance. You are asked to create a portal where employees can request their vacation online, the manager
receives a notification to approve or decline that request, and the information (time used, balances) are stored within
the portal.

# Detailed description Application process - workflow
![Application process - workflow](./flow.png "Application process - workflow")



##Application process - summary

1. The employee signs into the portal

2. A list of past applications is displayed, sorted by submission date (descending) including the following fields
    1. Date submitted
    2. Dates requested (vacation start - vacation end)
    3. Days requested
    4. Status (pending/approved/rejected)

3. A button “submit request” appears above the list. The employee clicks on the button to visit the submission form The submission form includes the following fields:
    1. Date from (vacation start)
    2. Date to (vacation end)
    3. Reason (textarea)
    4. Submit button
4. After the employee fills-in the fields and clicks on “submit”, he/she is taken back to the list of applications
5. Upon submitting the application, an email is sent to the employee’s administrator. The email includes the following
   body:
   ```
   Dear supervisor,
   Employee {user} requested for some time off,
   starting on {vacation_start} and ending on {vacation_end},
   stating the reason:  {reason}
   Click on one of the below links to approve or reject the application:
   {approve_link} - {reject_link}
   ```
6. The administrator (who acts as a supervisor as well) clicks on one of the “approve” or “reject” links to mark the
   application accordingly
7. As soon as the administrator makes a selection, another email goes out to the user notifying him/her of the
   application outcome, with the following body:
```
Dear employee, your supervisor has {accepted/rejected} your application submitted on {submission_date}.
```


##User provisioning process
The portal includes an administration page where the designated administrator can create and
edit users. The process can be summarized as follows:

1. The administrator signs in with his/her credentials:
2.  He/she views a list of his/her users, with the following fields:
    1. User first name
    2. User last name
    3. User email
    4. User type (employee/admin)
3. On top of the page there is a button to create a user. Clicking on it takes the admin to the user creation page,
   which includes a form with the following fields:
    1. First name
    2. Last name
    3. Email
    4. Password
    5. Confirm password
    6. User type (drop down, admin/employee)
    7. Create button
4. In the list of users, each entry is clickable.
    1. Clicking on it takes the admin to the user properties page
    2. which includes the same form as the “creation” page, only this time all fields are pre-populated with the user’s entries (
       except for the password and the confirm password fields) and the create button is now an update button.
    3. The administrator can change the user’s properties by clicking on the update button. User login process When an employee
       visits the portal’s homepage, a “login” form displays, prompting him/her to enter his/her email and password, to sign
       in.

Technical specifications

1. The portal must be created using PHP 7+.
2. The portal must be based on MySQL or MariaDB for the data storage. 3. You must use the Laravel framework for the
   backend. You are allowed to use any frontend framework. Deliverables
1. Source code for the application.
2. Documentation.
3. A dump of the database needed to run the app. 6
