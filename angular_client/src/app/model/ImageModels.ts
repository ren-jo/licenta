export class Annotation{
  id:number;
  label:String;
  points:Point[];
}

export  class Point{
  x:number;
  y:number;
}

export class ImageAnnotation{
  id:number;
  imageID:number;
  imageName:String;
  annotations:Annotation[];
}

export class ImageEntity{
  id:number;
  name:string;
  postedBy:string;
  date:string;
  isVerified:boolean;
  data:any;
}

export class Project{
  id:number;
  name:string;
  userId:number;
  images:ImageEntity[];
  userIDsAllowed:number[];
  createdByUser:string;
}



