#Node exam script
USE employeemanager;
#Demo employees
INSERT INTO employees(name,age,position,wage,ischeckedin,email)
VALUES('Tobias Nymann',24,'Engineer',1000,0,"Tobias@Tobias.se");
INSERT INTO employees(name,age,position,wage,ischeckedin,email)
VALUES("Balder Tin",30,"Ferry-operator",777,0,"Balder@Balder.com");
INSERT INTO employees(name,age,position,wage,ischeckedin,email)
VALUES("Jonas Elkjær",24,"Football-player",99999,0,"Jonas@Jonas.dk");
INSERT INTO employees(name,age,position,wage,ischeckedin,email)
VALUES("Frederik Storgaard",30,"Games-workshop assistant",30,0,"Fred@Frederik.ru");

#Demo bulletin
INSERT INTO bulletin(headline,message,budget)
VALUES("Today's products + xtra info",
"Hello everyone,
Today we are trying to push extra office supplies on our customers.
So make sure that you ask every customer if they would like an ekstra pen or notebook.
We are also celebrating Jim's 10 year anniversary with the company this friday at 1PM.
Furthermore: Please stop treating the workplace as a landfill.
There are 20 trash cans on this floor alone!
Best regards -John Smith CEO",
10000);