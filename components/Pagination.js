import blogStyle from '@/styles/BlogIndex.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'


const PaginationSlide = (props ) => {
    const { pages, currentPage, setCurrentPage, queryParam } = props
    const router = useRouter()
    if(currentPage > pages.length) setCurrentPage(pages.length)
    return (
        <div className={blogStyle.paginationt} style={{padding:'2rem',color:'black',display:'flex',justifyContent:'center',alignItems:'center'}}>
          {
            <span title="First Page" className={`${blogStyle.pageNum} ${currentPage > 1 ? null : blogStyle.disabledArrow}`} onClick={() => {
              if(currentPage != pages[0]){
              setCurrentPage(1)
              router.push(router.pathname.replace('[tag]', '').replace('[topic]','')+`${queryParam? '/'+queryParam +'/' : '/'}?page=${1}`)
              }
            }}>
              <svg width=".75rem" height='1.5rem' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/></svg>
            </span> 
          }
          {
            <span title="Previouse Page" className={`${blogStyle.pageNum} ${currentPage > 1 ? null : blogStyle.disabledArrow}`} onClick={() => {
              if(currentPage != pages[0]){

              setCurrentPage(Number(currentPage)-1)
              router.push(router.pathname.replace('[tag]', '').replace('[topic]','')+`${queryParam? '/'+queryParam +'/' : '/'}?page=${Number(currentPage)-1}`)
              }
            }}>
              <svg width='.75rem' height='1.5rem' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
            </span> 
          }
          {
            pages && currentPage <= 10
            ? currentPage > 5 ?
            <><span>...</span>{
              pages.filter((el) => el> Number(currentPage) - 5 && el < Number(currentPage) + 5).map((el) => {
                return(
                  <span key={el} className={`${blogStyle.pageNum} ${el == currentPage ? blogStyle.activePage: null}`} onClick={() => {
                      if(el != currentPage){
                      setCurrentPage(Number(el))
                      router.push(router.pathname.replace('[tag]', '').replace('[topic]','')+`${queryParam? '/'+queryParam +'/' : '/'}?page=${Number(el)}`)}
                  }} >
                  {el.toString()}
                  </span>
                )
              })

            }{pages.length > 10 ? <span>...</span> : null}</>
            :
            <>{
              pages.filter((el) => el <= 10).map((el) => {
                return(
                  <span key={el} className={`${blogStyle.pageNum} ${el == currentPage ? blogStyle.activePage: null}`} onClick={() => {
                      if(el != currentPage){
                      setCurrentPage(Number(el))
                      router.push(router.pathname.replace('[tag]', '').replace('[topic]','')+`${queryParam? '/'+queryParam +'/' : '/'}?page=${Number(el)}`)}
                  }} >
                  {el.toString()}
                  </span>
                )
              })
            }{pages.length > 10 ? <span>...</span> : null}</>
            // pages More than 10
            : <>
            <span>...</span>
            {
              pages.filter((el) => el >= pages.length - 10).map((el) => {
                return(
                  <span key={el} className={`${blogStyle.pageNum} ${el == currentPage ? blogStyle.activePage: null}`} onClick={() => {
                      if(el != currentPage){
                      setCurrentPage(Number(el))
                      router.push(router.pathname.replace('[tag]', '').replace('[topic]','')+`${queryParam? '/'+queryParam +'/' : '/'}?page=${Number(el)}`)}
                  }} >
                  {el.toString()}
                  </span>
                )
              })
            }
            
            </>
          }
          
          {
            <span title="Next Page" className={`${blogStyle.pageNum} ${currentPage < pages.length ? null : blogStyle.disabledArrow}`} onClick={() => {
            if(currentPage != pages[pages.length-1])  {
              setCurrentPage(Number(currentPage)+1)
              router.push(router.pathname.replace('[tag]', '').replace('[topic]','')+`${queryParam? '/'+queryParam +'/' : '/'}?page=${Number(currentPage)+1}`)
            }
            }}>
              <svg width='.75rem' height='1.5rem' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
            </span>
          }
          {
            <span title="Last Page" className={`${blogStyle.pageNum} ${currentPage < pages.length ? null : blogStyle.disabledArrow}`} onClick={() => {
            if(currentPage != pages[pages.length-1])  {
              setCurrentPage(Number(pages.length))
              router.push(router.pathname.replace('[tag]', '').replace('[topic]','')+`${queryParam? '/'+queryParam +'/' : '/'}?page=${Number(pages.length)}`)
            }
            }}>
              <svg width='.75rem' height='1.5rem' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
            </span>
          }
        </div>
    )
}

export default PaginationSlide;
