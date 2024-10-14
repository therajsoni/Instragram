import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from './ui/textarea'
import { toast } from 'sonner';



const ExploreAllData = () => {

const [data,setData] = useState([]);
const [loading,setLoading] = useState(false);

const user = useSelector((store)=>store.auth);

const id = user?._id;

useEffect(()=>{
    const fetchAllBlogData = async() => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/user/6709767b21f8d7ffe3809d17/getblog`);
            const allData = await response.json(); 
            setData(allData.blogs); 
          } catch (error) {
            console.error("Error fetching blog data:", error);
          }
        };
   
      fetchAllBlogData();
  
},[data]);

console.log(data);



const deleteHandle = async(blogId) => {
  const res = await fetch(`http://localhost:8000/api/v1/user/deleteblog/${blogId}`,{
    method : "DELETE",
  })  
  if(res?.ok){
    toast.success('ok');
  }
  else{
    toast.error('not ok')
  }
}


useEffect(()=>{
  deleteHandle();
},[])


  return (
    <div className='ml-80 mb-9 mt-6 grid grid-cols-3 gap-4'>
        {data && data.length > 0 ? (
        data.map((i, index) => (
          <div className=''>

          <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle>Create project</CardTitle>
                  <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Title</Label>
                        <Input readOnly id="name" name='title' value={i.title} placeholder={i.title} type='text' 
                        //  onChange={handleChangeInput} 
                           />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="description">Subject</Label>
                        {/* <Select 
                        // readOnly
                        // onValueChange={handleSelectChange}
                         value={i.description || ''}>
                          <SelectTrigger  id="framework">
                            <SelectValue placeholder='Enter description'    />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="next">Next.js</SelectItem>
                            <SelectItem value="sveltekit">SvelteKit</SelectItem>
                            <SelectItem value="astro">Astro</SelectItem>
                            <SelectItem value="nuxt">Nuxt.js</SelectItem>
                          </SelectContent>
                        </Select> */}
                        <Textarea
                          name='text'
                          value={i.text}
                          placeholder={i.text}
                          readOnly
                          // onChange={handleChangeInput}
                      />
                      </div>
                      
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button className="w-full" onClick={deleteHandle(i._id)} >
Delete
                  </Button>
                </CardFooter>
              </Card>
          
          
          
          
            </div>
        )
      )
      ) : (
        <p>No blogs found</p>
      )}

    </div>
  )
}

export default ExploreAllData
