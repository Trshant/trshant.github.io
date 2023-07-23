To configure ssh for your server you will need these things:
1. a `something.pem` file
2. somethinguser - username to log into the server
3. xxx.xxx.xxx.xxx  -The ip address of the server 

Next check if you have a .ssh folder in your $HOME directory. if you dont, create it using 

    mkdir -p ~/.ssh && chmod 700 ~/.ssh
then check if you have a config file inside the .ssh directory. in case you dont have one
	    
	touch ~/.ssh/config
	chmod 600 ~/.ssh/config

the first line creates the file. the second line adds the correct permissions

move the .pem file to the .ssh dir. then add the permission to it.

    chmod 400 ~/.ssh/something.pem
  
 then you need to edit the config file you crested earlier:

    Host a_name_you_will_use
		  Hostname xxx.xxx.xxx.xxx
		  Port 22
		  ServerAliveInterval 120
		  User somethinguser
		  IdentityFile ~/.ssh/something.pem

save and exit.

Now open a terminal and...

    ssh a_name_you_will_use
 
 you will get a message, something like this one below. You will get this message only once, the first time you connect via ssh
  
     The authenticity of host '192.168.1.4 (192.168.1.4)' can't be established.
    ECDSA key fingerprint is 6a:75:e3:ac:5d:f8:cc:04:01:7b:ef:4d:42:ad:b9:83.
    Are you sure you want to continue connecting (yes/no/[fingerprint])?

Enter "yes" to this.  and you should be logged in.
