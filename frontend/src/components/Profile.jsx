import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AtSign } from "lucide-react";

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = true;
  const isFollowing = false;


  const handleTabChange = (tab) => {
setActiveTab(tab);
  }

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks 



  return (
    <div className="flex max-w-5xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-10 p-8">
        <div className="grid grid-cols-2">
          <section className="flex items-center justify-center">
            <Avatar h-32 w-32>
              <AvatarImage
                src={userProfile?.profilePicture}
                alt="profilePhoto"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span>{userProfile?.username}</span>
                {isLoggedInUserProfile ? (
                  <>
                    <>
                      <Button
                        className="hover:bg-gray-200 h-8"
                        variant="secondary"
                      >
                        Edit profile
                      </Button>
                      <Button
                        className="hover:bg-gray-200 h-8"
                        variant="secondary"
                      >
                        View archive
                      </Button>
                      <Button
                        className="hover:bg-gray-200 h-8"
                        variant="secondary"
                      >
                        Ad tools
                      </Button>
                    </>
                  </>
                ) : isFollowing ? (
                  <>
                    <Button variant="secondary" className="h-8">
                      UnFollow
                    </Button>
                    <Button variant="secondary" className="h-8">
                      Message
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="bg-[#0095F6] hover:bg-[#3192d2]  h-8">
                      Follow
                    </Button>
                  </>
                )}
              </div>
              <div className="flex items-center gap-4">
                <p>
                  <span className="font-semibold">
                    {userProfile?.posts.length}
                  </span>
                  posts
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.followers.length}
                  </span>
                  followers
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.following.length}
                  </span>
                  following
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">
                {userProfile?.bio || "bio.here..."}
              </span>
              <Badge className={"w-fit"} variant={"secondary"}>
                <AtSign /> <span className="pl-1">{userProfile?.username}</span>
              </Badge>
              <span>🤯Learn code with here i</span>
              <span>🤯Learn code with here i</span>
              <span>🆗Learn code with here i</span>
            </div>
          </section>
        </div>
        <div className="border-t border-t-gray-200">
          <div className="flex items-center justify-center gap-10 text-sm">
            <span className={`p-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : '' }`} onClick={()=>handleTabChange('posts')}>POSTS</span>
            <span className={`p-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : '' }`}  onClick={()=>handleTabChange('saved')}>SAVED</span>
            <span className="p-3 cursor-pointer">REELS</span>
            <span className="p-3 cursor-pointer">TAGS</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1" >
          {
            displayedPost?.map((post)=>{
              return (
                <div key={post?._id} className="relative group cursor-pointer">
                  <img src={post?.image} alt="postimage" className="rounded-sm my-2 w-full aspect-sqaure object-cover" />

                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;
