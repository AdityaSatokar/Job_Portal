export default class Job{
    constructor(id,name,category,designation,location,salary,positions,skills,lastDate,imgURL)
        {
            this.id = id;
            this.name = name;
            this.category = category;
            this.designation = designation;
            this.location = location;
            this.salary = salary;
            this.positions = positions;
            this.skills = skills;
            this.lastDate = lastDate;
            this.imgURL = imgURL;
            this.postedBy = new Date();
        }

        static getJobById(id){
            return jobs.find((j)=> j.id == id)
        }

        static createJob(name,category,designation,location,salary,positions,skills,lastDate,imgURL)
        {
            const id = "job@"+String(Date.now());

            const newJob = new Job(id,name,category,designation,location,salary,positions,skills,lastDate,imgURL);

            jobs.push(newJob);
        }

        static deleteJobById(id){
            jobs = jobs.filter(job=>{
                return job.id !== id;
            })
        }

        static updateJob(id,name,category,designation,location,salary,positions,skills,lastDate,imgURL){
            const index = jobs.findIndex(job => job.id == id)
            console.log(category, designation, location, name, salary, positions, skills, lastDate);
            console.log(index);

            const updatedJob = new Job(id,name,category,designation,location,salary,Number(positions),skills,lastDate,imgURL)
            console.log(updatedJob)

            jobs[index] = updatedJob;
        }
}

export let jobs = [
    new Job(
        "job@1710692520030",
        "Facebook",
        "Non-Tech",
        "HR",
        "Hyderabad, TG",
        "10-15 LPA",
        2,
        ["MongoDB","SQL"], 
        "30 April 2024", 
        "/resources/logos/facebook.png"
    ),
    new Job(
        "job@1710692560496",
        "Amazon",
        "Tech",
        "Front-End Developer",
        "New Delhi, HR",
        "90-95 LPA",
        1,
        ["React","Angular"], 
        "30 April 2024", 
        "/resources/logos/amazon.png"
    ),
    new Job(
        "job@1710692597935",
        "Microsoft",
        "Tech",
        "SDE",
        "Hyderabad, TG",
        "25-50 LPA",
        5,
        ["MongoDB","SQL","C++"], 
        "30 April 2024", 
        "/resources/logos/microsoft.png"
    ),
    new Job(
        "job@1710692621506",
        "Google",
        "Tech",
        "SDE",
        "Bangalore, KA",
        "50-55 LPA",
        3,
        ["MongoDB","SQL","C++","Python"], 
        "30 April 2024", 
        "/resources/logos/google.png"
    )
];