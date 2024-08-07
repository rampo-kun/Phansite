import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";

async function page({ params }: { params: { id: string } }) {
    const user = await currentUser();
    if (!user) return null;

    // fetch organization list created by user
    const userInfo = await fetchUser(params.id);
    if (!userInfo?.onBoarded) redirect("/onboarding");
    return (
        <section>
            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />
            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {profileTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value}>
                                <Image src={tab.icon} alt={tab.label} width={24} height={24} className="object-contain" />
                                <p className="max-sm:hidden ml-2">
                                    {tab.label}
                                </p>
                                {
                                    tab.label === 'Threads' && (
                                        <p className=" rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2 ml-2">
                                            {userInfo?.threads?.length}
                                        </p>
                                    )
                                }
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {profileTabs.map((tab) => (
                        <TabsContent
                            key={`content-${tab.label}`}
                            value={tab.value}
                            className='w-full text-light-1'
                        >
                            {/* @ts-ignore */}
                            <ThreadsTab
                                currentUserId={user.id}
                                accountId={userInfo.id}
                                accountType='User'
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}

export default page