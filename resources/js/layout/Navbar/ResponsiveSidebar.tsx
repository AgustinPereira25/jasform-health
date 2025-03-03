// import * as Dialog from "@radix-ui/react-dialog";

// import { icons } from "@/ui";
// import { Sidebar } from "./Sidebar";
// import type { openCloseNavbar } from "./../../shared.types";

// interface ResponsiveSidebarProps {
//     isNavbarOpen: boolean;
// };

// export const ResponsiveSidebar: React.FC<openCloseNavbar & ResponsiveSidebarProps> = ({ onOpenNavbar, isNavbarOpen }) => {
//     // const [sidebarOpen, setSidebarOpen] = useState(isNavbarOpen);
//     return (
//         <>
//             <Sidebar onOpenNavbar={onOpenNavbar} />
//             {/* <Dialog.Root open={isNavbarOpen}>
//                 <Dialog.Portal>
//                     <Dialog.Overlay className="fixed inset-0 bg-gray-800/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
//                     <Dialog.Content className="fixed inset-y-0 left-0 z-50 h-full w-1/2 gap-4 border-r border-gray-700 bg-black shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm">
//                         <Sidebar onOpenNavbar={onOpenNavbar} />
//                         <Dialog.Close className="absolute right-8 top-8 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none">
//                             <icons.XMarkIcon className="h-4 w-4 stroke-[4] text-gray-500" />
//                             <span className="sr-only">Close</span>
//                         </Dialog.Close>
//                     </Dialog.Content>
//                 </Dialog.Portal>
//             </Dialog.Root> */}

//             <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-[#1B4A76] px-4 shadow-sm sm:px-6 md:hidden lg:px-8">
//                 <button
//                     type="button"
//                     className="-m-2.5 p-2.5 text-white xl:hidden"
//                     onClick={onOpenNavbar}
//                 >
//                     <span className="sr-only">Open sidebar</span>
//                     <icons.Bars3Icon className="h-5 w-5" aria-hidden="true" />
//                 </button>
//                 <img src="/JASForm_Isologo_for_small_transp 2.png" alt="Logo" className="h-10" />
//             </div>
//         </>
//     );
// };
