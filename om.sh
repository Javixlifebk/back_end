today=$(date +"%Y-%m-%dT00:00:00.000Z")
yesterday=$(date -d "1 days ago" +"%Y-%m-%dT00:00:00.000Z")
lastweek=$(date -d "1 weeks ago" +"%Y-%m-%dT00:00:00.000Z")
k="$"
s="'"




mongoexport --db=javix --collection=citizens --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/dailyCitizens.csv --type=csv --fields=citizenId,firstName,lastName,sex,mobile,email,aadhaar,raadhaar,javixId,citizenLoginId,pstatus,isInstant,updatedAt,createdAt,screenerId -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$yesterday"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"


mongoexport --db=javix --collection=citizens --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/weeklyCitizens.csv --type=csv --fields=citizenId,firstName,lastName,sex,mobile,email,aadhaar,raadhaar,javixId,citizenLoginId,pstatus,isInstant,updatedAt,createdAt,screenerId -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$lastweek"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"

mongoexport --db=javix --collection=citizendetails --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/dailyCitizenDetails.csv --type=csv --fields=citizenId,citizenDetailId,dateOfBirth,dateOfOnBoarding,bloodGroup,country,state,district,address,pincode,photo,updatedAt,createdAt -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$yesterday"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"


mongoexport --db=javix --collection=citizendetails --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/weeklyCitizenDetails.csv --type=csv --fields=citizenId,citizenDetailId,dateOfBirth,dateOfOnBoarding,bloodGroup,country,state,district,address,pincode,photo,updatedAt,createdAt -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$lastweek"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"
