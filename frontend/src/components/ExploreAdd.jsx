import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

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




const ExploreAdd = () => {

    const [data,setData] = useState({
        title : '',
        description : '',
        text : '',
    })
    
    const [loading,setLoading] = useState(false);

    const handleChangeInput = (e) => {
        setData({
            ...data,[e.target.name]: e.target.value
        })
    } 
    
    console.log(data);

    const handleSelectChange = (value) => {
        setData({
            ...data,description : value
        })
    } 



    const handleToSubmit = async(e) => {
     setLoading(true)   
    
    const res = await axios.post('http://localhost:8000/api/v1/user/6709767b21f8d7ffe3809d17/addblog',data,{
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    
    if(res?.data.success){
        setLoading(false)
        toast.success('okay');
    }
    else{
        setLoading(false)
       toast.error('no')
    }  
        
    }

    useEffect(()=>{
        handleToSubmit()
    },[])




    return (
  <div className='ml-56'>

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
              <Input id="name" name='title' value={data.title} placeholder='Enter Title' type='text'  onChange={handleChangeInput}   />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Subject</Label>
              <Select 
              onValueChange={handleSelectChange}
               value={data.description}>
                <SelectTrigger  id="framework">
                  <SelectValue placeholder='Enter description'   />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                name='text'
                value={data.text}
                placeholder='Enter feed'
                onChange={handleChangeInput}
            />
            </div>
            
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="w-full" onClick={handleToSubmit} >
            {
                loading ? "loading" : "Deloy"
            }
        </Button>
      </CardFooter>
    </Card>




  </div>
  )
}

export default ExploreAdd