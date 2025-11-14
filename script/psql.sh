export $(grep -v '^#' ../.env | xargs)

psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME