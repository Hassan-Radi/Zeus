const ADD_TO_EXPORT_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M12.8794 10.8324H12.0388C11.9732 10.8324 11.9185 10.8871 11.9185 10.9527V11.9184H2.07944V2.07773H11.9201V3.04336C11.9201 3.10898 11.9748 3.16367 12.0404 3.16367H12.881C12.9466 3.16367 13.0013 3.11055 13.0013 3.04336V1.47773C13.0013 1.21211 12.7873 0.998047 12.5216 0.998047H1.47944C1.21382 0.998047 0.999756 1.21211 0.999756 1.47773V12.5184C0.999756 12.784 1.21382 12.998 1.47944 12.998H12.5201C12.7857 12.998 12.9998 12.784 12.9998 12.5184V10.9527C12.9998 10.8855 12.9451 10.8324 12.8794 10.8324ZM13.1701 6.89961L10.9529 5.14961C10.8701 5.08398 10.7498 5.14336 10.7498 5.24805V6.43555H5.84351C5.77476 6.43555 5.71851 6.4918 5.71851 6.56055V7.43555C5.71851 7.5043 5.77476 7.56055 5.84351 7.56055H10.7498V8.74805C10.7498 8.85274 10.8716 8.91211 10.9529 8.84649L13.1701 7.09649C13.185 7.08479 13.1971 7.06985 13.2054 7.0528C13.2137 7.03574 13.218 7.01702 13.218 6.99805C13.218 6.97908 13.2137 6.96035 13.2054 6.9433C13.1971 6.92624 13.185 6.9113 13.1701 6.89961Z" fill="currentColor"/>
  </svg>`;

const SUMMARY_CLOSED_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM16.1367 15.2273L15.4664 16.1414C15.4518 16.1613 15.4335 16.1781 15.4124 16.1909C15.3913 16.2037 15.3678 16.2122 15.3434 16.2159C15.319 16.2196 15.2942 16.2184 15.2702 16.2125C15.2463 16.2065 15.2237 16.1959 15.2039 16.1813L11.3273 13.3547C11.3032 13.3373 11.2836 13.3145 11.2701 13.2879C11.2566 13.2614 11.2497 13.2321 11.25 13.2023V6.75C11.25 6.64687 11.3344 6.5625 11.4375 6.5625H12.5648C12.668 6.5625 12.7523 6.64687 12.7523 6.75V12.5508L16.0945 14.9672C16.1789 15.0258 16.1977 15.143 16.1367 15.2273Z" fill="#A2AAB5"/>
  </svg>`;

const SUMMARY_OPEN_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM16.1367 15.2273L15.4664 16.1414C15.4518 16.1613 15.4335 16.1781 15.4124 16.1909C15.3913 16.2037 15.3678 16.2122 15.3434 16.2159C15.319 16.2196 15.2942 16.2184 15.2702 16.2125C15.2463 16.2065 15.2237 16.1959 15.2039 16.1813L11.3273 13.3547C11.3032 13.3373 11.2836 13.3145 11.2701 13.2879C11.2566 13.2614 11.2497 13.2321 11.25 13.2023V6.75C11.25 6.64687 11.3344 6.5625 11.4375 6.5625H12.5648C12.668 6.5625 12.7523 6.64687 12.7523 6.75V12.5508L16.0945 14.9672C16.1789 15.0258 16.1977 15.143 16.1367 15.2273Z" fill="#00829B"/>
  </svg>`;

const DOWNLOAD_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M6.90144 9.3252C6.91313 9.34014 6.92807 9.35222 6.94513 9.36053C6.96218 9.36884 6.98091 9.37316 6.99988 9.37316C7.01885 9.37316 7.03757 9.36884 7.05463 9.36053C7.07168 9.35222 7.08662 9.34014 7.09832 9.3252L8.84832 7.11113C8.91238 7.02988 8.85457 6.90957 8.74988 6.90957H7.59207V1.62207C7.59207 1.55332 7.53582 1.49707 7.46707 1.49707H6.52957C6.46082 1.49707 6.40457 1.55332 6.40457 1.62207V6.90801H5.24988C5.14519 6.90801 5.08738 7.02832 5.15144 7.10957L6.90144 9.3252ZM12.7186 8.77832H11.7811C11.7124 8.77832 11.6561 8.83457 11.6561 8.90332V11.3096H2.34363V8.90332C2.34363 8.83457 2.28738 8.77832 2.21863 8.77832H1.28113C1.21238 8.77832 1.15613 8.83457 1.15613 8.90332V11.9971C1.15613 12.2736 1.37957 12.4971 1.65613 12.4971H12.3436C12.6202 12.4971 12.8436 12.2736 12.8436 11.9971V8.90332C12.8436 8.83457 12.7874 8.77832 12.7186 8.77832Z" fill="white"/>
  </svg>`;

const COPY_TO_CLIPBOARD_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10.75 2H12C13.1031 2 14 2.89687 14 4V14C14 15.1031 13.1031 16 12 16H4C2.89688 16 2 15.1031 2 14V4C2 2.89687 2.89688 2 4 2H5.55C5.78125 0.859375 6.79063 0 8 0C9.20937 0 10.2188 0.859375 10.45 2H10.75ZM4 3.5C3.725 3.5 3.5 3.725 3.5 4V14C3.5 14.275 3.725 14.5 4 14.5H12C12.275 14.5 12.5 14.275 12.5 14V4C12.5 3.725 12.275 3.5 12 3.5H11.5V4.25C11.5 4.66563 11.1656 5 10.75 5H5.25C4.83437 5 4.5 4.66563 4.5 4.25V3.5H4ZM8 3.25C8.19891 3.25 8.38968 3.17098 8.53033 3.03033C8.67098 2.88968 8.75 2.69891 8.75 2.5C8.75 2.30109 8.67098 2.11032 8.53033 1.96967C8.38968 1.82902 8.19891 1.75 8 1.75C7.80109 1.75 7.61032 1.82902 7.46967 1.96967C7.32902 2.11032 7.25 2.30109 7.25 2.5C7.25 2.69891 7.32902 2.88968 7.46967 3.03033C7.61032 3.17098 7.80109 3.25 8 3.25Z" fill="#A2AAB5"/>
  </svg>`;

const BOOKMARK_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5.24988 3.96905H6.40457V9.25499C6.40457 9.32374 6.46082 9.37999 6.52957 9.37999H7.46707C7.53582 9.37999 7.59207 9.32374 7.59207 9.25499V3.96905H8.74988C8.85457 3.96905 8.91238 3.84874 8.84832 3.76749L7.09832 1.55187C7.08662 1.53693 7.07168 1.52484 7.05463 1.51653C7.03757 1.50822 7.01885 1.50391 6.99988 1.50391C6.98091 1.50391 6.96218 1.50822 6.94513 1.51653C6.92807 1.52484 6.91313 1.53693 6.90144 1.55187L5.15144 3.76593C5.08738 3.84874 5.14519 3.96905 5.24988 3.96905ZM12.7186 8.78624H11.7811C11.7124 8.78624 11.6561 8.84249 11.6561 8.91124V11.3175H2.34363V8.91124C2.34363 8.84249 2.28738 8.78624 2.21863 8.78624H1.28113C1.21238 8.78624 1.15613 8.84249 1.15613 8.91124V12.005C1.15613 12.2816 1.37957 12.505 1.65613 12.505H12.3436C12.6202 12.505 12.8436 12.2816 12.8436 12.005V8.91124C12.8436 8.84249 12.7874 8.78624 12.7186 8.78624Z" fill="currentColor"/>
  </svg>`;

const EDIT_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <g clip-path="url(#clip0_365_436)">
      <path d="M3.02644 10.7485C3.05769 10.7485 3.08894 10.7454 3.12019 10.7407L5.74832 10.2798C5.77957 10.2735 5.80925 10.2595 5.83113 10.236L12.4546 3.6126C12.4691 3.59814 12.4805 3.58097 12.4884 3.56207C12.4962 3.54317 12.5003 3.52291 12.5003 3.50244C12.5003 3.48198 12.4962 3.46171 12.4884 3.44281C12.4805 3.42391 12.4691 3.40674 12.4546 3.39229L9.85769 0.793848C9.828 0.76416 9.78894 0.748535 9.74675 0.748535C9.70457 0.748535 9.6655 0.76416 9.63582 0.793848L3.01238 7.41729C2.98894 7.44072 2.97488 7.46885 2.96863 7.5001L2.50769 10.1282C2.49249 10.2119 2.49792 10.2981 2.52351 10.3792C2.54911 10.4603 2.59409 10.534 2.65457 10.5938C2.75769 10.6938 2.88738 10.7485 3.02644 10.7485ZM4.07957 8.02354L9.74675 2.35791L10.8921 3.50322L5.22488 9.16885L3.83582 9.41416L4.07957 8.02354ZM12.7499 12.061H1.24988C0.973315 12.061 0.749878 12.2845 0.749878 12.561V13.1235C0.749878 13.1923 0.806128 13.2485 0.874878 13.2485H13.1249C13.1936 13.2485 13.2499 13.1923 13.2499 13.1235V12.561C13.2499 12.2845 13.0264 12.061 12.7499 12.061Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip0_365_436">
        <rect width="14" height="14" fill="white"/>
      </clipPath>
    </defs>
  </svg> `;

const CREATE_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <g clip-path="url(#clip0_365_1483)">
      <path d="M4.12489 7.50096H6.49989V9.87596C6.49989 9.94471 6.55614 10.001 6.62489 10.001H7.37489C7.44364 10.001 7.49989 9.94471 7.49989 9.87596V7.50096H9.87489C9.94364 7.50096 9.99989 7.44471 9.99989 7.37596V6.62596C9.99989 6.55721 9.94364 6.50096 9.87489 6.50096H7.49989V4.12596C7.49989 4.05721 7.44364 4.00096 7.37489 4.00096H6.62489C6.55614 4.00096 6.49989 4.05721 6.49989 4.12596V6.50096H4.12489C4.05614 6.50096 3.99989 6.55721 3.99989 6.62596V7.37596C3.99989 7.44471 4.05614 7.50096 4.12489 7.50096Z" fill="currentColor"/>
      <path d="M12.7502 0.750488H1.25024C0.973682 0.750488 0.750244 0.973926 0.750244 1.25049V12.7505C0.750244 13.0271 0.973682 13.2505 1.25024 13.2505H12.7502C13.0268 13.2505 13.2502 13.0271 13.2502 12.7505V1.25049C13.2502 0.973926 13.0268 0.750488 12.7502 0.750488ZM12.1252 12.1255H1.87524V1.87549H12.1252V12.1255Z" fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip0_365_1483">
        <rect width="14" height="14" fill="white"/>
      </clipPath>
    </defs>
  </svg>`;

const CHECK_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M15.1437 2.25H13.8955C13.7205 2.25 13.5544 2.33036 13.4473 2.46786L6.08478 11.7946L2.55442 7.32143C2.50101 7.25362 2.43294 7.1988 2.35531 7.16106C2.27768 7.12333 2.19252 7.10368 2.1062 7.10357H0.85799C0.738347 7.10357 0.672275 7.24107 0.74549 7.33393L5.63656 13.5304C5.86513 13.8196 6.30442 13.8196 6.53478 13.5304L15.2562 2.47857C15.3294 2.3875 15.2633 2.25 15.1437 2.25Z" fill="#3AA76D"/>
  </svg>`;

const PEN_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g clip-path="url(#clip0_648_8811)">
    <path d="M3.45872 12.284C3.49443 12.284 3.53015 12.2805 3.56586 12.2751L6.56943 11.7483C6.60515 11.7412 6.63908 11.7251 6.66408 11.6983L14.2337 4.12868C14.2503 4.11216 14.2634 4.09254 14.2724 4.07094C14.2813 4.04934 14.2859 4.02618 14.2859 4.00279C14.2859 3.9794 14.2813 3.95625 14.2724 3.93464C14.2634 3.91304 14.2503 3.89342 14.2337 3.8769L11.2659 0.907254C11.2319 0.873326 11.1873 0.855469 11.1391 0.855469C11.0909 0.855469 11.0462 0.873326 11.0123 0.907254L3.44265 8.4769C3.41586 8.50368 3.39979 8.53583 3.39265 8.57154L2.86586 11.5751C2.84849 11.6708 2.8547 11.7692 2.88395 11.862C2.91319 11.9547 2.9646 12.0389 3.03372 12.1073C3.15158 12.2215 3.29979 12.284 3.45872 12.284ZM4.66229 9.16975L11.1391 2.69475L12.448 4.00368L5.97122 10.4787L4.38372 10.759L4.66229 9.16975ZM14.5712 13.784H1.42836C1.11229 13.784 0.856934 14.0394 0.856934 14.3555V14.9983C0.856934 15.0769 0.921219 15.1412 0.999791 15.1412H14.9998C15.0784 15.1412 15.1426 15.0769 15.1426 14.9983V14.3555C15.1426 14.0394 14.8873 13.784 14.5712 13.784Z" fill="#A2AAB5"/>
  </g>
  <defs>
    <clipPath id="clip0_648_8811">
      <rect width="16" height="16" fill="white"/>
    </clipPath>
  </defs>
</svg>`;

const BIN_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M5.28544 2.14118H5.14258C5.22115 2.14118 5.28544 2.0769 5.28544 1.99833V2.14118H10.714V1.99833C10.714 2.0769 10.7783 2.14118 10.8569 2.14118H10.714V3.4269H11.9997V1.99833C11.9997 1.36797 11.4872 0.855469 10.8569 0.855469H5.14258C4.51222 0.855469 3.99972 1.36797 3.99972 1.99833V3.4269H5.28544V2.14118ZM14.2854 3.4269H1.71401C1.39794 3.4269 1.14258 3.68225 1.14258 3.99833V4.56975C1.14258 4.64833 1.20686 4.71261 1.28544 4.71261H2.36401L2.80508 14.0519C2.83365 14.6608 3.33722 15.1412 3.94615 15.1412H12.0533C12.664 15.1412 13.1658 14.6626 13.1944 14.0519L13.6354 4.71261H14.714C14.7926 4.71261 14.8569 4.64833 14.8569 4.56975V3.99833C14.8569 3.68225 14.6015 3.4269 14.2854 3.4269ZM11.9158 13.8555H4.08365L3.65151 4.71261H12.3479L11.9158 13.8555Z" fill="#A2AAB5"/>
</svg>`;

const REMOVE_FROM_EXPORTS_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.53524 3H13.0001V10H3.53524L1.2019 6.5L3.53524 3ZM2.70319 2.4453C2.88865 2.1671 3.20088 2 3.53524 2H13.0001C13.5523 2 14.0001 2.44772 14.0001 3V10C14.0001 10.5523 13.5523 11 13.0001 11H3.53524C3.20088 11 2.88865 10.8329 2.70319 10.5547L0.369854 7.0547C0.145921 6.7188 0.145921 6.2812 0.369854 5.9453L2.70319 2.4453ZM9.43271 5.52798L8.26506 6.56194L9.43271 7.59589C9.46755 7.62463 9.49549 7.65929 9.51487 7.6978C9.53424 7.73632 9.54466 7.77789 9.5455 7.82004C9.54634 7.8622 9.53759 7.90407 9.51975 7.94316C9.50192 7.98226 9.47538 8.01777 9.44171 8.04758C9.40805 8.07739 9.36794 8.1009 9.32379 8.11669C9.27965 8.13248 9.23236 8.14023 9.18475 8.13949C9.13715 8.13874 9.0902 8.12952 9.04671 8.11236C9.00322 8.0952 8.96407 8.07046 8.93161 8.03961L7.76396 7.00566L6.59631 8.03961C6.5291 8.09507 6.4402 8.12526 6.34835 8.12382C6.2565 8.12239 6.16886 8.08944 6.1039 8.03192C6.03894 7.9744 6.00173 7.89679 6.00011 7.81546C5.99849 7.73412 6.03258 7.65541 6.09521 7.59589L7.26286 6.56194L6.09521 5.52798C6.03258 5.46847 5.99849 5.38975 6.00011 5.30842C6.00173 5.22708 6.03894 5.14948 6.1039 5.09196C6.16886 5.03443 6.2565 5.00148 6.34835 5.00005C6.4402 4.99861 6.5291 5.02881 6.59631 5.08426L7.76396 6.11822L8.93161 5.08426C8.99883 5.02881 9.08772 4.99861 9.17957 5.00005C9.27143 5.00148 9.35907 5.03443 9.42403 5.09196C9.48899 5.14948 9.5262 5.22708 9.52782 5.30842C9.52944 5.38975 9.49534 5.46847 9.43271 5.52798Z" fill="#00829B"/>
</svg>`;
