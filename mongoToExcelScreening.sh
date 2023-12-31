today=$(date +"%Y-%m-%dT00:00:00.000Z")
yesterday=$(date -d "1 days ago" +"%Y-%m-%dT00:00:00.000Z")
lastweek=$(date -d "1 weeks ago" +"%Y-%m-%dT00:00:00.000Z")
k="$"
s="'"


mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin  -d=javix --collection=tmp_out_all -q='{"severity_bp" : 2}' --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/bpRed.csv


mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin -d=javix -c=tmp_out_all -q='{"severity_bp" : 1}' --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/bpAmber.csv


mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin  -d=javix -c=tmp_out_all -q='{"severity_bp" : 0}' --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/bpGreen.csv


mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin -d=javix -c=tmp_out_all -q='{"severity_bmi" : 2}' --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/bmiRed.csv

mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin -d=javix -c=tmp_out_all -q='{"severity_bmi" : 1}' --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/bmiAmber.csv



mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin  -d=javix -c=tmp_out_all -q='{"severity_bmi" : 0}' --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/bmiGreen.csv


mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin -d=javix -c=tmp_out_all -q='{"severity_spo2" : 2}' --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/spo2Red.csv

mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin  -d=javix -c=tmp_out_all -q='{"severity_spo2" : 1}' --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/spo2Amber.csv


mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin  -d=javix -c=tmp_out_all -q='{"severity_spo2" : 0}' --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/spo2Green.csv

mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin -d=javix -c=tmp_out_all -q='{"severity_temperature" : 2}' --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/temperatureRed.csv

mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin -d=javix -c=tmp_out_all -q='{"severity_temperature" : 1}' --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/temperatureAmber.csv


mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin -d=javix -c=tmp_out_all -q='{"severity_temperature" : 0}' --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/temperatureGreen.csv


mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin -d=javix -c=tmp_out_all -q='{"severity_pulse" : 2}' --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/pulseRed.csv

mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin -d=javix -c=tmp_out_all -q='{"severity_pulse" : 1}' --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/pulseAmber.csv


mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin -d=javix -c=tmp_out_all -q='{"severity_pulse" : 0}' --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/pulseGreen.csv


mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin -d=javix -c=tmp_out_citizens --type=csv --fields=citizenId,firstName,lastName,sex,mobile,email,aadhaar,raadhaar,javixId,citizenLoginId,pstatus,isInstant,updatedAt,createdAt,screenerId,ScreenerfirstName,ScreenerlastName,citizenAddress,citizenDOB,issubscreener --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/unscreened.csv

# mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin --db=javix --collection=tmp_out0 --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/dailyScreeningScreener.csv --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress
mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin --db=javix --collection=screeningcases --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/dailyScreeningScreener.csv  --type=csv --fields=citizenId,screenerId,createdAt
#  -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$yesterday"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"

mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin --db=javix --collection=screeningcases  --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/weeklyScreeningScreener.csv  --type=csv --fields=citizenId,screenerId,createdAt
# -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$lastweek"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"

mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin --db=javix --collection=screeningcases  --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/dailyScreeningSevika.csv -q='{"issubscreener" : 0}' --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress,isdeleted
# -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$yesterday"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"

mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin --db=javix --collection=screeningcases -q='{"issubscreener" : 0}'  --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/weeklyScreeningSevika.csv  --type=csv --fields=citizenId,notes,screenerId,firstName,lastName,status,height,weight,bmi,bpsys,bpdia,arm,createdAt,updatedAt,spo2,pulse,respiratory_rate,temperature,referDocId,severity_bp,severity_spo2,severity_temperature,severity_pulse,severity_bmi,severity_respiratory_rate,severity,caseId,citizenFirstName,citizenLastName,citizenEmail,citizenSex,citizenDOB,citizenAadhaar,citizenPhone,citizenAddress,isdeleted 
# -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$lastweek"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"

mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin --db=javix --collection=citizens --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/dailyCitizens.csv --type=csv --fields=citizenId,firstName,lastName,sex,mobile,email,aadhaar,raadhaar,javixId,citizenLoginId,pstatus,isInstant,updatedAt,createdAt,screenerId 
# -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$yesterday"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"


mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin --db=javix --collection=citizens --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/weeklyCitizens.csv --type=csv --fields=citizenId,firstName,lastName,sex,mobile,email,aadhaar,raadhaar,javixId,citizenLoginId,pstatus,isInstant,updatedAt,createdAt,screenerId 
# -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$lastweek"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"

mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin --db=javix --collection=citizendetails --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/dailyCitizenDetails.csv --type=csv --fields=citizenId,citizenDetailId,dateOfBirth,dateOfOnBoarding,bloodGroup,country,state,district,address,pincode,photo,updatedAt,createdAt 
# -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$yesterday"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"

mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin --db=javix --collection=lipidcritical --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/lipidCriticalCitizens.csv --type=csv --fields=citizenId,FirstName,LastName,Email,Gender,Address,ScreenerId,ScreenerFirstName,ScreenerLastName,Mobile,Age

mongoexport -u admin123 -p Jzfq2n6b4n15 --authenticationDatabase=admin --db=javix --collection=citizendetails --out=/mnt/volume_blr1_01/javix/Javix-BackEnd/uploads/documents/weeklyCitizenDetails.csv --type=csv --fields=citizenId,citizenDetailId,dateOfBirth,dateOfOnBoarding,bloodGroup,country,state,district,address,pincode,photo,updatedAt,createdAt 
# -q="{ "${k}and": [ { "createdAt": { "${k}gte": { "${k}date": ${s}"$lastweek"${s} } } }, { "createdAt": { "${k}lte": { "${k}date": ${s}"$today"${s} } } } ] }"
