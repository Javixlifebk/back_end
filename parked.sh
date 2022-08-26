
today=$(date +"%Y-%m-%dT00:00:00.000Z")
yesterday=$(date -d "1 days ago" +"%Y-%m-%dT00:00:00.000Z")
lastweek=$(date -d "1 weeks ago" +"%Y-%m-%dT00:00:00.000Z")
k="$"
s="'"


mongoexport --db=javix --collection=screeningcases --out=/home/javix/Javix-BackEnd/uploads/documents/dailyScreening.csv --type=csv --fields=citizenId,doctorId,notes,screenerId,status,height,weight,bmi,bpsys,arm,bpdia,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$yesterday"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"

mongoexport --db=javix --collection=screeningcases --out=/home/javix/Javix-BackEnd/uploads/documents/weeklyScreening.csv --type=csv --fields=citizenId,doctorId,notes,screenerId,status,height,weight,bmi,bpsys,arm,bpdia,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$lastweek"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"

mongoexport --db=javix --collection=citizens --out=/home/javix/Javix-BackEnd/uploads/documents/dailyCitizens.csv --type=csv --fields=citizenId,firstName,lastName,sex,mobile,email,aadhaar,raadhaar,javixId,citizenLoginId,pstatus,isInstant,updatedAt,createdAt,screenerId -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$yesterday"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"


mongoexport --db=javix --collection=citizens --out=/home/javix/Javix-BackEnd/uploads/documents/weeklyCitizens.csv --type=csv --fields=citizenId,firstName,lastName,sex,mobile,email,aadhaar,raadhaar,javixId,citizenLoginId,pstatus,isInstant,updatedAt,createdAt,screenerId -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$lastweek"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"

mongoexport --db=javix --collection=citizendetails --out=/home/javix/Javix-BackEnd/uploads/documents/dailyCitizenDetails.csv --type=csv --fields=citizenId,citizenDetailId,dateOfBirth,dateOfOnBoarding,bloodGroup,country,state,district,address,pincode,photo,updatedAt,createdAt -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$yesterday"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"


mongoexport --db=javix --collection=citizendetails --out=/home/javix/Javix-BackEnd/uploads/documents/weeklyCitizenDetails.csv --type=csv --fields=citizenId,citizenDetailId,dateOfBirth,dateOfOnBoarding,bloodGroup,country,state,district,address,pincode,photo,updatedAt,createdAt -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$lastweek"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"
