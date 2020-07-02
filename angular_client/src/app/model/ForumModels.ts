export class Category{
  name:string;
  description:string;
}

export class Reply{
  username:string;
  content:string;
  likes:number;
  dislikes:number;
}

export class Topic{
  userName:string;
  description:string;
  fullDescription:string;
  category:Category;
  replies:Reply[];
}

