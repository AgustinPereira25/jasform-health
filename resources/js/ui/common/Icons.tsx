import * as heroIcons from "@heroicons/react/24/outline";

import type { SVGProps } from "@/shared.types";
import { tw } from "@/utils";

export const icons = {
    ...heroIcons,

    SpinnerIcon: ({ className, ...props }: SVGProps) => (
        <div role="status">
            <svg
                aria-hidden="true"
                className={tw(
                    "mr-2 h-14 w-14 animate-spin fill-primary text-gray-200",
                    className,
                )}
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    ),
    DashboardIcon: () => (
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.56641 3.7543C3.56641 3.34041 3.90193 3.00488 4.31583 3.00488H14.8077C15.2216 3.00488 15.5571 3.34041 15.5571 3.7543V5.25314C15.5571 5.66704 15.2216 6.00256 14.8077 6.00256H4.31583C3.90193 6.00256 3.56641 5.66704 3.56641 5.25314V3.7543Z" fill="#E8EEF9" />
            <path d="M3.56641 9.74967C3.56641 9.33577 3.90193 9.00025 4.31583 9.00025H8.81235C9.22624 9.00025 9.56177 9.33577 9.56177 9.74967V14.2462C9.56177 14.6601 9.22624 14.9956 8.81235 14.9956H4.31583C3.90193 14.9956 3.56641 14.6601 3.56641 14.2462V9.74967Z" fill="#E8EEF9" />
            <path d="M12.5595 9.74967C12.5595 9.33577 12.895 9.00025 13.3089 9.00025H14.8077C15.2216 9.00025 15.5571 9.33577 15.5571 9.74967V14.2462C15.5571 14.6601 15.2216 14.9956 14.8077 14.9956H13.3089C12.895 14.9956 12.5595 14.6601 12.5595 14.2462V9.74967Z" fill="#E8EEF9" />
            <path d="M3.56641 3.7543C3.56641 3.34041 3.90193 3.00488 4.31583 3.00488H14.8077C15.2216 3.00488 15.5571 3.34041 15.5571 3.7543V5.25314C15.5571 5.66704 15.2216 6.00256 14.8077 6.00256H4.31583C3.90193 6.00256 3.56641 5.66704 3.56641 5.25314V3.7543Z" stroke="#E8EEF9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.56641 9.74967C3.56641 9.33577 3.90193 9.00025 4.31583 9.00025H8.81235C9.22624 9.00025 9.56177 9.33577 9.56177 9.74967V14.2462C9.56177 14.6601 9.22624 14.9956 8.81235 14.9956H4.31583C3.90193 14.9956 3.56641 14.6601 3.56641 14.2462V9.74967Z" stroke="#E8EEF9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.5595 9.74967C12.5595 9.33577 12.895 9.00025 13.3089 9.00025H14.8077C15.2216 9.00025 15.5571 9.33577 15.5571 9.74967V14.2462C15.5571 14.6601 15.2216 14.9956 14.8077 14.9956H13.3089C12.895 14.9956 12.5595 14.6601 12.5595 14.2462V9.74967Z" stroke="#E8EEF9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.668 9.63028C12.668 9.21639 13.0035 8.88086 13.4174 8.88086H14.9162C15.3301 8.88086 15.6656 9.21639 15.6656 9.63028V14.1268C15.6656 14.5407 15.3301 14.8762 14.9162 14.8762H13.4174C13.0035 14.8762 12.668 14.5407 12.668 14.1268V9.63028Z" fill="#A8D9FE" stroke="#A8D9FE" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    MyFormsIcon: () => (
        <svg width="19" height="18" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.49884 15.4896H11.993C12.8208 15.4896 13.4919 14.8185 13.4919 13.9907V6.80694C13.4919 6.60818 13.4129 6.41757 13.2724 6.27702L9.21487 2.2195C9.07432 2.07896 8.8837 2 8.68494 2H4.49884C3.67105 2 3 2.67105 3 3.49884V13.9907C3 14.8185 3.67105 15.4896 4.49884 15.4896Z" fill="#E8EEF9" stroke="#E8EEF9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 8.74512H10.4965M6 11.7428H10.4965" stroke="#6EBFE9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    MyBillsIcon: () => (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.4333 3.14355H5.44025C4.61246 3.14355 3.94141 3.81461 3.94141 4.6424V16.6331L6.93909 15.1343L9.93677 16.6331L12.9345 15.1343L15.9321 16.6331V4.6424C15.9321 3.81461 15.2611 3.14355 14.4333 3.14355Z" fill="#E8EEF9" stroke="#E8EEF9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.6875 11.3871L12.184 6.89062M8.06223 7.26534H8.06973M11.8093 11.0124H11.8168M8.43692 7.26534C8.43692 7.47228 8.26916 7.64005 8.06221 7.64005C7.85526 7.64005 7.6875 7.47228 7.6875 7.26534C7.6875 7.05839 7.85526 6.89062 8.06221 6.89062C8.26916 6.89062 8.43692 7.05839 8.43692 7.26534ZM12.184 11.0124C12.184 11.2194 12.0163 11.3871 11.8093 11.3871C11.6024 11.3871 11.4346 11.2194 11.4346 11.0124C11.4346 10.8055 11.6024 10.6377 11.8093 10.6377C12.0163 10.6377 12.184 10.8055 12.184 11.0124Z" stroke="#6EBFE9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    MySubscriptionIcon: () => (
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2524 4.72559H3.76056C2.93277 4.72559 2.26172 5.39664 2.26172 6.22443V15.2175C2.26172 16.0453 2.93277 16.7163 3.76056 16.7163H14.2524C15.0802 16.7163 15.7513 16.0453 15.7513 15.2175V6.22443C15.7513 5.39664 15.0802 4.72559 14.2524 4.72559Z" fill="#E8EEF9" stroke="#E8EEF9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.25977 9.22168H12.754" stroke="#6EBFE9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.00977 6.22424V3.22656M12.0051 6.22424V3.22656" stroke="#D8E3F5" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    UsersIcon: () => (
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1620_5791)">
                <path d="M5.24906 8.51447C5.24906 9.34225 4.578 10.0133 3.75021 10.0133C2.92243 10.0133 2.25137 9.34225 2.25137 8.51447C2.25137 7.68668 2.92243 7.01562 3.75021 7.01562C4.578 7.01562 5.24906 7.68668 5.24906 8.51447Z" fill="#E8EEF9" />
                <path d="M3.75021 12.2616C2.80361 12.2616 1.99365 12.958 1.66214 13.944C1.5588 14.2513 1.50195 14.5868 1.50195 14.9381V16.0087H5.99848V14.9381C5.99848 14.5868 5.94163 14.2513 5.83829 13.944C5.50678 12.958 4.69682 12.2616 3.75021 12.2616Z" fill="#E8EEF9" />
                <path d="M5.24906 8.51447C5.24906 9.34225 4.578 10.0133 3.75021 10.0133C2.92243 10.0133 2.25137 9.34225 2.25137 8.51447C2.25137 7.68668 2.92243 7.01562 3.75021 7.01562C4.578 7.01562 5.24906 7.68668 5.24906 8.51447Z" stroke="#E8EEF9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.75021 12.2616C2.80361 12.2616 1.99365 12.958 1.66214 13.944C1.5588 14.2513 1.50195 14.5868 1.50195 14.9381V16.0087H5.99848V14.9381C5.99848 14.5868 5.94163 14.2513 5.83829 13.944C5.50678 12.958 4.69682 12.2616 3.75021 12.2616Z" stroke="#E8EEF9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.7412 8.51447C15.7412 9.34225 15.0702 10.0133 14.2424 10.0133C13.4146 10.0133 12.7436 9.34225 12.7436 8.51447C12.7436 7.68668 13.4146 7.01562 14.2424 7.01562C15.0702 7.01562 15.7412 7.68668 15.7412 8.51447Z" fill="#E8EEF9" />
                <path d="M14.2424 12.2616C13.2958 12.2616 12.4858 12.958 12.1543 13.944C12.051 14.2513 11.9941 14.5868 11.9941 14.9381V16.0087H16.4907V14.9381C16.4907 14.5868 16.4338 14.2513 16.3305 13.944C15.999 12.958 15.189 12.2616 14.2424 12.2616Z" fill="#E8EEF9" />
                <path d="M15.7412 8.51447C15.7412 9.34225 15.0702 10.0133 14.2424 10.0133C13.4146 10.0133 12.7436 9.34225 12.7436 8.51447C12.7436 7.68668 13.4146 7.01562 14.2424 7.01562C15.0702 7.01562 15.7412 7.68668 15.7412 8.51447Z" stroke="#E8EEF9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.2424 12.2616C13.2958 12.2616 12.4858 12.958 12.1543 13.944C12.051 14.2513 11.9941 14.5868 11.9941 14.9381V16.0087H16.4907V14.9381C16.4907 14.5868 16.4338 14.2513 16.3305 13.944C15.999 12.958 15.189 12.2616 14.2424 12.2616Z" stroke="#E8EEF9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.2454 6.26682C11.2454 7.5085 10.2388 8.51508 8.9971 8.51508C7.75542 8.51508 6.74884 7.5085 6.74884 6.26682C6.74884 5.02514 7.75542 4.01855 8.9971 4.01855C10.2388 4.01855 11.2454 5.02514 11.2454 6.26682Z" fill="#8EC8F3" />
                <path d="M8.9971 10.7633C7.41943 10.7633 6.06949 11.7384 5.51698 13.1187C5.34475 13.549 5.25 14.0186 5.25 14.5104V16.0093H12.7442V14.5104C12.7442 14.0186 12.6495 13.549 12.4772 13.1187C11.9247 11.7384 10.5748 10.7633 8.9971 10.7633Z" fill="#8EC8F3" />
                <path d="M11.2454 6.26682C11.2454 7.5085 10.2388 8.51508 8.9971 8.51508C7.75542 8.51508 6.74884 7.5085 6.74884 6.26682C6.74884 5.02514 7.75542 4.01855 8.9971 4.01855C10.2388 4.01855 11.2454 5.02514 11.2454 6.26682Z" stroke="#D8E3F5" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.9971 10.7633C7.41943 10.7633 6.06949 11.7384 5.51698 13.1187C5.34475 13.549 5.25 14.0186 5.25 14.5104V16.0093H12.7442V14.5104C12.7442 14.0186 12.6495 13.549 12.4772 13.1187C11.9247 11.7384 10.5748 10.7633 8.9971 10.7633Z" stroke="#D8E3F5" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_1620_5791">
                    <rect width="17.9861" height="17.9861" fill="white" transform="translate(0.00390625 1.02051)" />
                </clipPath>
            </defs>
        </svg>
    ),
    SystemsFormsIcon: () => (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.95508 5.46173C3.95508 4.63394 4.62613 3.96289 5.45392 3.96289H14.447C15.2748 3.96289 15.9458 4.63394 15.9458 5.46173V14.4548C15.9458 15.2826 15.2748 15.9536 14.447 15.9536H5.45392C4.62613 15.9536 3.95508 15.2826 3.95508 14.4548V5.46173Z" fill="#E8EEF9" stroke="#E8EEF9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.9485 6.95996V12.9553M9.95081 9.20822V12.9553M6.95312 11.4565V12.9553" stroke="#6EBFE9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    SystemsOrganizationsIcon: () => (
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.413 2.26855H5.91882C5.09104 2.26855 4.41998 2.93961 4.41998 3.7674V15.7581H14.9119V3.7674C14.9119 2.93961 14.2408 2.26855 13.413 2.26855Z" fill="#E8EEF9" />
            <path d="M14.9119 15.7581V3.7674C14.9119 2.93961 14.2408 2.26855 13.413 2.26855H5.91882C5.09104 2.26855 4.41998 2.93961 4.41998 3.7674V15.7581M14.9119 15.7581L16.4107 15.7581M14.9119 15.7581H4.41998M4.41998 15.7581L2.92114 15.7581" stroke="#E8EEF9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.41766 5.2666H8.16708M7.41766 8.26428H8.16708M11.1648 5.2666H11.9142M11.1648 8.26428H11.9142M10.4153 11.262H8.9165C8.50261 11.262 8.16708 11.5975 8.16708 12.0114V15.7585H11.1648V12.0114C11.1648 11.5975 10.8292 11.262 10.4153 11.262Z" stroke="#6EBFE9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    ),
    SystemsBillingIcon: () => (
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.7376 9.88834C15.7376 13.6134 12.7179 16.6331 8.99283 16.6331C5.26779 16.6331 2.24805 13.6134 2.24805 9.88834C2.24805 6.1633 5.26779 3.14355 8.99283 3.14355C12.7179 3.14355 15.7376 6.1633 15.7376 9.88834Z" fill="#E8EEF9" stroke="#E8EEF9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.9924 6.89102C7.75072 6.89102 6.74414 7.56208 6.74414 8.38986C6.74414 9.21765 7.75072 9.8887 8.9924 9.8887C10.2341 9.8887 11.2407 10.5598 11.2407 11.3875C11.2407 12.2153 10.2341 12.8864 8.99242 12.8864M8.9924 6.89102C9.82458 6.89102 10.5512 7.19244 10.9399 7.64044M8.9924 6.89102V6.1416M8.9924 6.89102L8.99242 12.8864M8.99242 12.8864L8.9924 13.6358M8.99242 12.8864C8.16025 12.8864 7.43367 12.585 7.04493 12.137" stroke="#6EBFE9" strokeWidth="1.49884" strokeLinecap="round" />
        </svg>

    ),
    GetLinkIcon: () => (
        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.53125" width="28" height="28" rx="4" fill="#407EC9" />
            <path d="M7.66602 10.1042C7.66602 9.21821 8.30442 8.5 9.09194 8.5H19.0734C19.8609 8.5 20.4993 9.21821 20.4993 10.1042V19.7292C20.4993 20.6151 19.8609 21.3333 19.0734 21.3333H9.09194C8.30442 21.3333 7.66602 20.6151 7.66602 19.7292V10.1042Z" fill="#E8EEF9" stroke="#E8EEF9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.8346 6.66699H22.3346M22.3346 6.66699V12.167M22.3346 6.66699L13.168 15.8337" stroke="#6EBFE9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    ThreeDotsIcon: () => (
        <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1599_5196)">
                <path d="M10.9844 18.5C10.9844 20.6727 9.21953 22.4375 7.04688 22.4375C4.87422 22.4375 3.10938 20.6727 3.10938 18.5C3.10938 16.3273 4.87422 14.5625 7.04688 14.5625C9.21953 14.5625 10.9844 16.3273 10.9844 18.5ZM22.2344 18.5C22.2344 20.6727 20.4695 22.4375 18.2969 22.4375C16.1242 22.4375 14.3594 20.6727 14.3594 18.5C14.3594 16.3273 16.1242 14.5625 18.2969 14.5625C20.4695 14.5625 22.2344 16.3273 22.2344 18.5ZM29.5469 22.4375C27.3742 22.4375 25.6094 20.6727 25.6094 18.5C25.6094 16.3273 27.3742 14.5625 29.5469 14.5625C31.7195 14.5625 33.4844 16.3273 33.4844 18.5C33.4844 20.6727 31.7195 22.4375 29.5469 22.4375Z" fill="#707070" />
            </g>
            <defs>
                <clipPath id="clip0_1599_5196">
                    <rect width="36" height="36" fill="white" transform="translate(0.296875 0.5)" />
                </clipPath>
            </defs>
        </svg>
    ),
    KeyIcon: () => (
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.2411 11.7479C13.7245 11.7479 15.7376 9.73477 15.7376 7.25141C15.7376 4.76804 13.7245 2.75488 11.2411 2.75488C8.75773 2.75488 6.74457 4.76804 6.74457 7.25141C6.74457 7.70568 6.81194 8.14423 6.93722 8.55759L2.46755 13.0273C2.327 13.1678 2.24805 13.3584 2.24805 13.5572V15.495C2.24805 15.9089 2.58357 16.2445 2.99747 16.2445H5.24573V14.7456H6.74457V13.2468H8.24341L9.93491 11.5553C10.3483 11.6806 10.7868 11.7479 11.2411 11.7479Z" fill="#E8EEF9" stroke="#E8EEF9" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.2422 5.75293C12.07 5.75293 12.741 6.42398 12.741 7.25177" stroke="#A8D9FE" strokeWidth="1.49884" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    UploadIcon: ({ className }: SVGProps) => (
        <svg width="36" height="36" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M21.5 5H5.5C4.43913 5 3.42172 5.42143 2.67157 6.17157C1.92143 6.92172 1.5 7.93913 1.5 9V29M1.5 29V33C1.5 34.0609 1.92143 35.0783 2.67157 35.8284C3.42172 36.5786 4.43913 37 5.5 37H29.5C30.5609 37 31.5783 36.5786 32.3284 35.8284C33.0786 35.0783 33.5 34.0609 33.5 33V25M1.5 29L10.672 19.828C11.4221 19.0781 12.4393 18.6569 13.5 18.6569C14.5607 18.6569 15.5779 19.0781 16.328 19.828L21.5 25M33.5 17V25M33.5 25L30.328 21.828C29.5779 21.0781 28.5607 20.6569 27.5 20.6569C26.4393 20.6569 25.4221 21.0781 24.672 21.828L21.5 25M21.5 25L25.5 29M29.5 5H37.5M33.5 1V9M21.5 13H21.52" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
};

export const IconWrapper = ({
    size = "md",
    className,
    style,
    children,
}: {
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}) => (
    <div
        className={tw(
            "item-center flex flex-row",
            size === "sm" && "h-5 w-5",
            size === "md" && "h-6 w-6",
            size === "lg" && "h-7 w-7",
            size === "xl" && "h-10 w-10",
            className,
        )}
        style={style}
    >
        {children}
    </div>
);
