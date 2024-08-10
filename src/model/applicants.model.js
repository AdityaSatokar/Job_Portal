export default class Applicant{

    constructor(id,jobId,name,email,mobile,resume){
        this.id = id
        this.jobId = jobId;
        this.name = name ;
        this.email = email;
        this.mobile = mobile;
        this.resume = resume;
    }

    static createApplicant(jobId,name,email,mobile,resume){
        const id = Date.now();
        let applicant = new Applicant(id,jobId,name,email,mobile,resume);
        applicants.push(applicant);
    }

    static getApplicantsByJobId(id){
        const filteredApplicants = applicants.filter((a)=>{
            return a.jobId == id;
        })
        return filteredApplicants;
    }

    static getNumberOfApplicants(id){
        const filteredApplicants = applicants.filter((a)=>{
            return a.jobId == id;
        })
        return filteredApplicants.length;
    }

}

export let applicants = [
    new Applicant(
        1710692703274,
        "job@1710692520030",
        "Aditya Satokar",
        "example@gmail.com",
        "1234567890",
        "/resources/resumes/resume1.pdf"
    ),
    new Applicant(
        1710692739256,
        "job@1710692560496",
        "Animesh Pal",
        "example@gmail.com",
        "1234567890",
        "/resources/resumes/resume2.pdf"
    ),
    new Applicant(
        1710692761157,
        "job@1710692597935",
        "Gaurav Thakre",
        "example@gmail.com",
        "1234567890",
        "/resources/resumes/resume3.pdf"
    ),
    new Applicant(
        1710692790152,
        "job@1710692621506",
        "Saumil Saxena",
        "example@gmail.com",
        "1234567890",
        "/resources/resumes/resume4.pdf"
    )
];
