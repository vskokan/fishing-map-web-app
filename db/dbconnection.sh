#!/usr/bin/bash

HOST="ec2-3-251-0-202.eu-west-1.compute.amazonaws.com";
DATABASE="dceo9am6b27lce";
USER="eqnjhfzgwgdyxr";
PORT="5432";
PASSWORD="7f9a88c2263f8762d104dfbaf833ceb515f0386f70cfb570aa94d183d65d1f1d";
PGPASSWORD="$PASSWORD" psql -U "$USER" -d "$DATABASE" -h "$HOST" -W;
