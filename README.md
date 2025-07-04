Authentication: Firestore

# Back-end:
docker run -d -p 8080:80 -v /Users/traianalexandru/projects/opusone/ang-material/src/assets/db.json:/data/db.json clue/json-server
docker stop <container-hash>
docker start <container-hash>

# or from the project folder:
json-server --watch src/assets/db.json --port 8080 --routes src/assets/routes.json
# port and routes are optional depending on your api endpoint path

# node v = 20.11.1
# Angular 19.2
