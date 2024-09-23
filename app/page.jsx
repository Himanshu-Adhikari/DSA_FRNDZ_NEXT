"use client";

import { Client, Databases } from "appwrite";
import { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "@/components/Navbar";
import UserCard from "@/components/UserCard";
import TopMembers from "@/components/TopMembers";
import SkeletonLoader from "@/components/SkeletonLoader";
import { ContactUs } from "@/components/Contact";

const fetchRating = async (platform, userId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${platform}/${userId}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch ${platform} rating`);
    }
    const data = await response.json();
    return data.rating ?? 0; // Default to 0 if rating is undefined
  } catch (error) {
    console.error(error);
    return 0; // Default to 0 in case of error
  }
};

const fetchUsers = async (databases) => {
  try {
    const response = await databases.listDocuments(
      "66dd71f80013a99087fe",
      "66dd720c001bfaeaac08"
    );
    return response.documents;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};

const Page = () => {
  const client = useMemo(
    () =>
      new Client()
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("66dd6e530013a0051965"),
    []
  );
  const [users, setUsers] = useState([]);
  const [userRatings, setUserRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const cachedUsers = JSON.parse(localStorage.getItem("cachedUsers"));
      const cachedRatings = JSON.parse(localStorage.getItem("cachedRatings"));
      const cacheTimestamp = localStorage.getItem("cacheTimestamp");
      const currentTime = new Date().getTime();
      const cacheDuration = 1000 * 60 * 60; // 1 hour

      if (
        cachedUsers &&
        cachedRatings &&
        cacheTimestamp &&
        currentTime - Number(cacheTimestamp) < cacheDuration
      ) {
        setUsers(cachedUsers);
        setUserRatings(cachedRatings);
        setFilteredUsers(cachedUsers);
        setLoading(false);
      } else {
        const databases = new Databases(client);
        const userData = await fetchUsers(databases);
        setUsers(userData);

        const ratingsPromises = userData.map(async (user) => {
          const leetcodeRating = fetchRating("leetcode", user.leetcode_name);
          const codeforcesRating = fetchRating(
            "codeforces",
            user.codeforces_name
          );
          const codechefRating = fetchRating("codechef", user.codechef_name);

          const [leetcode, codeforces, codechef] = await Promise.all([
            leetcodeRating,
            codeforcesRating,
            codechefRating,
          ]);

          return {
            ...user,
            leetcode_rating: leetcode,
            codeforces_rating: codeforces,
            codechef_rating: codechef,
          };
        });

        const ratingsWithData = await Promise.all(ratingsPromises);
        setUserRatings(ratingsWithData);
        setFilteredUsers(userData);

        localStorage.setItem("cachedUsers", JSON.stringify(userData));
        localStorage.setItem("cachedRatings", JSON.stringify(ratingsWithData));
        localStorage.setItem("cacheTimestamp", new Date().getTime().toString());

        setLoading(false);
      }
    };

    fetchData();
  }, [client]);

  const filterData = useCallback(() => {
    if (!searchQuery) {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = users.filter((item) => {
        const name = item.Name; // Access the Name property
        return typeof name === "string" && name.toLowerCase().includes(query); // Check if it's a string before calling toLowerCase
      });
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  useEffect(() => {
    filterData();
  }, [searchQuery, filterData]);

  return (
    <>
      <Navbar />
      <div className="bg-zinc-950 min-h-screen flex flex-col justify-center">
        <div className="container mx-auto p-6 grid md:grid-cols-1 lg:grid-cols-3  gap-6">
          <div className="container mx-auto p-6">
            <h2 className="text-white text-xl mb-4">Top Leetcode Members</h2>
            {loading ? (
              <SkeletonLoader count={3} />
            ) : (
              <TopMembers users={userRatings} platform="leetcode" />
            )}
          </div>

          <div className="container mx-auto p-6">
            <h2 className="text-white text-xl mb-4">Top Codeforces Members</h2>
            {loading ? (
              <SkeletonLoader count={3} />
            ) : (
              <TopMembers users={userRatings} platform="codeforces" />
            )}
          </div>

          <div className="container mx-auto p-6">
            <h2 className="text-white text-xl mb-4">Top Codechef Members</h2>
            {loading ? (
              <SkeletonLoader count={3} />
            ) : (
              <TopMembers users={userRatings} platform="codechef" />
            )}
          </div>
        </div>
        <div>
          <h1 className="text-white text-center text-3xl underline">Members</h1>
          <div className="flex justify-center items-center ">
            <div
              className="p-2 mb-4  border-gray-300 rounded-md text-black text-center"
              style={{ maxWidth: "200px" }}
            >
              <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="container mx-auto p-6 grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {loading ? (
              <SkeletonLoader count={3} />
            ) : filteredUsers.length === 0 ? (
              <p className="text-white">No users found.</p>
            ) : (
              filteredUsers.map((user) => (
                <div key={user.$id} className="flex flex-col">
                  <UserCard
                    name={user.Name}
                    organisation={user.Organisation}
                    leetcode={user.Leetcode}
                    codechef={user.CodeChef}
                    codeforces={user.CodeForces}
                    leetcode_name={user.leetcode_name}
                    codechef_name={user.codechef_name}
                    codeforces_name={user.codeforces_name}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ContactUs />
    </>
  );
};

export default Page;
