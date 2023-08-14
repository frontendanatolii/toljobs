"use client";
import {
	currentUser as userSelector,
	isLoading as loaders,
} from "@/redux/selectors";
import store from "@/redux/store";
import { setCurrentUser } from "@/redux/usersSlice";
import { message } from "antd";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "./Loader";
import { setIsLoading } from "@/redux/loadersSlice";

export function LayoutProvider({ children }: { children: React.ReactNode }) {
	const { currentUser } = useSelector(userSelector);
	const { isLoading } = useSelector(loaders);
	const [showSidebar, setShowSidebar] = useState(true);
	const [menuItems, setMenuItems] = useState([
		{
			name: "Home",
			path: "/",
			icon: "ri-home-heart-line",
		},
		{
			name: "Profile",
			path: "/profile",
			icon: "ri-user-2-fill",
		},
		{
			name: "Applications",
			path: "/applications",
			icon: "ri-list-check",
		},
		{
			name: "Settings",
			path: "/settings",
			icon: "ri-settings-5-fill",
		},
		{
			name: "Saved",
			path: "/saved",
			icon: "ri-heart-line",
		},
	]);
	const router = useRouter();
	const dispatch = useDispatch();
	const pathname = usePathname();
	const isPublicPage = pathname === "/login" || pathname === "/register";

	const getCurrentUser = async () => {
	  try {
		dispatch(setIsLoading(true));
		const response = await axios.get("/api/users/currentuser");
		const isEmployer = response.data.data.userType === "employer";
	
		if (isEmployer) {
		  const tempMenuItems: any = menuItems;
	      tempMenuItems[2].name = "Posted Jobs";
	      tempMenuItems[2].path = "/jobs";
		  setMenuItems(tempMenuItems);
		}
	
		dispatch(setCurrentUser(response.data.data));
	  } catch (error: any) {
		  message.error(error.response.data.message || "Something went wrong 🤷‍♂️");
		  message.error("Please clear your cookies and try again");
	  } finally {
		  dispatch(setIsLoading(false));
	  }
	  };

	const onLogout = async () => {
		try {
			dispatch(setIsLoading(true));
			await axios.post("/api/users/logout");
			message.success("Successfully log out 😉");
			dispatch(setCurrentUser(null));
			router.push("/login");
		} catch (error: any) {
			message.error(error.response.data.message || "Something went wrong 🤷‍♂️");
		} finally {
			dispatch(setIsLoading(false));
		}
	};

	useEffect(() => {
		if (!isPublicPage && !currentUser) {
			getCurrentUser();
		}
	}, [pathname, currentUser]);

	return (
		<html>
			<head>
				<link
					href='https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css'
					rel='stylesheet'
				/>
			</head>
			<body>
				{isLoading ? <Loader /> : null}
				{isPublicPage ? (
					<div>{children}</div>
				) : (
					<div className='layout-parent'>
						<div className='sidebar'>
							<div className='logo'>
								{showSidebar ? <h1>TOLJOBS</h1> : null}
								{showSidebar ? (
									<i
										className='ri-close-circle-line'
										onClick={() => setShowSidebar(false)}
									></i>
								) : (
									<i
										className='ri-menu-fill'
										onClick={() => setShowSidebar(true)}
									></i>
								)}
							</div>
							<div className='menu-items'>
								{menuItems.map((item) => {
									const isActive = pathname === item.path;

									return (
										<div
											key={item.name}
											className={`menu-item ${
												isActive ? "active-menu-item" : ""
											}`}
											onClick={() => router.push(item.path)}
										>
											<i className={item.icon}></i>
											{showSidebar ? <span>{item.name}</span> : null}
										</div>
									);
								})}
							</div>
							<div className='user-info' onClick={onLogout}>
								{showSidebar ? (
									<div className='flex flex-col'>
										<span>{currentUser?.name}</span>
										<span>{currentUser?.email}</span>
									</div>
								) : null}
								<i className='ri-logout-box-line'></i>
							</div>
						</div>
						<div className='body'>{children}</div>
					</div>
				)}
			</body>
		</html>
	);
}
