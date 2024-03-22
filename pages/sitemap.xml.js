import { API_BASE_URL, WEBSITE_BASE_URL } from "@/config";
import axios from "axios";
function spcsUpper(str) {
    return str.toLowerCase().split(" ").join("-");
}
function generateSiteMap(properties, topLinks, blogLinks) {
    console.log(properties[0].propertyType.name);
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
    <loc>https://housepointegypt.com/</loc>
    <lastmod>${new Date().toLocaleString()}</lastmod>
    <priority>1.00</priority>
    <changefreq>daily</changefreq>
    </url>
    <url>
    <loc>https://housepointegypt.com/ar</loc>
    <lastmod>${new Date().toLocaleString()}</lastmod>
    <priority>1.00</priority>
    <changefreq>daily</changefreq>
    </url>
    <url>
    <loc>https://housepointegypt.com/rent</loc>
    <lastmod>${new Date().toLocaleString()}</lastmod>
    <priority>1</priority>
    <changefreq>daily</changefreq>
    </url>
    <url>
    <loc>https://housepointegypt.com/ar/إيجار</loc>
    <lastmod>${new Date().toLocaleString()}</lastmod>
    <priority>1</priority>
    <changefreq>daily</changefreq>
    </url>
    <url>
    <loc>https://housepointegypt.com/sale</loc>
    <lastmod>${new Date().toLocaleString()}</lastmod>
    <priority>1</priority>
    <changefreq>daily</changefreq>
    </url>
    <url>
    <loc>https://housepointegypt.com/ar/بيع</loc>
    <lastmod>${new Date().toLocaleString()}</lastmod>
    <priority>1</priority>
    <changefreq>daily</changefreq>
    </url>
    <url>
    <loc>https://housepointegypt.com/reads</loc>
    <lastmod>${new Date().toLocaleString()}</lastmod>
    <priority>1</priority>
    </url>
    <url>
    <loc>https://housepointegypt.com/ar/reads</loc>
    <lastmod>${new Date().toLocaleString()}</lastmod>
    <priority>1</priority>
    </url>
    <url>
    <loc>https://housepointegypt.com/contact</loc>
    <lastmod>${new Date().toLocaleString()}</lastmod>
    <priority>1</priority>
    </url>
    <url>
    <loc>https://housepointegypt.com/ar/contact</loc>
    <lastmod>${new Date().toLocaleString()}</lastmod>
    <priority>1</priority>
    </url>
    <url>
    <loc>https://housepointegypt.com/login</loc>
    <lastmod>${new Date().toLocaleString()}</lastmod>
    <priority>1</priority>
    </url>
    <url>
    <loc>https://housepointegypt.com/ar/login</loc>
    <lastmod>${new Date().toLocaleString()}</lastmod>
    <priority>1</priority>
    </url>
    ${blogLinks.map((blog) => {
        if (blog.lang == 'ar')
            return `
        <url>
            <loc>${encodeURI(`${WEBSITE_BASE_URL}/ar/reads/${blog.title.replaceAll(' ', '-').replaceAll('?', '_qm_')}`)}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <priority>1</priority>
            <changefreq>daily</changefreq>
        </url>
        `;
        else
            return `
        <url>
            <loc>${`${WEBSITE_BASE_URL}/reads/${blog.title.replaceAll(' ', '-').replaceAll('?', '_qm_')}`}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <priority>1</priority>
            <changefreq>daily</changefreq>
        </url>
        `;
    })}
    ${topLinks.map((topLink) => {
        return `
        <url>
        <loc>${`${WEBSITE_BASE_URL}${spcsUpper(topLink.link)}`}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1</priority>
        <changefreq>daily</changefreq>
        </url>
        <url>
        <loc>${encodeURI(`${WEBSITE_BASE_URL}/ar${spcsUpper(topLink.linkAr).match(/^\//) ? spcsUpper(topLink.linkAr) : '/' + spcsUpper(topLink.linkAr)}`)}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1</priority>
        <changefreq>daily</changefreq>
        </url>
        `;
    })}
     ${properties
            .map((property) => {
                if (property.propertyType)
                    return `
                    <url>
                    <loc>${`${WEBSITE_BASE_URL}/${property.type}/${spcsUpper(property.propertyType.name)}/${spcsUpper(property.area.name)}/${spcsUpper(property.subarea.name)}/${spcsUpper(property.title)}-${property.refNumber}`}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <priority>1</priority>
                    <changefreq>daily</changefreq>
                </url>
                <url>
                    <loc>${encodeURI(`${WEBSITE_BASE_URL}/ar/${property.type == "rent" ? "إيجار" : "بيع"}/${spcsUpper(property.propertyType.nameAr)}/${spcsUpper(property.area.nameAr)}/${spcsUpper(property.subarea.nameAr)}/${spcsUpper(property.titleAr)}-${property.refNumber}`)}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <priority>1</priority>
                    <changefreq>daily</changefreq>
                </url>
                <url>
                    <loc>${encodeURI(`${WEBSITE_BASE_URL}/${property.type == "rent" ? "rent" : "sale"}/${spcsUpper(property.propertyType.name)}/${spcsUpper(property.area.name)}/${spcsUpper(property.subarea.name)}/${spcsUpper(property.title)}-${property.refNumber}`)}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <priority>1</priority>
                    <changefreq>daily</changefreq>
                </url>
                <url>
                    <loc>${encodeURI(`${WEBSITE_BASE_URL}/ar/${property.type == "sale" ? "بيع" : "إيجار"}/${spcsUpper(property.propertyType.nameAr)}/${spcsUpper(property.area.nameAr)}/${spcsUpper(property.subarea.nameAr)}/${spcsUpper(property.titleAr)}-${property.refNumber}`)}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <priority>1</priority>
                    <changefreq>daily</changefreq>
                </url >
                <url>
                    <loc>${encodeURI(`${WEBSITE_BASE_URL}/${property.type == "sale" ? "sale" : "rent"}/${spcsUpper(property.propertyType.name)}/${spcsUpper(property.area.name)}/${spcsUpper(property.subarea.name)}/${spcsUpper(property.title)}-${property.refNumber}`)}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <priority>1</priority>
                    <changefreq>daily</changefreq>
                </url>
                    `;
            })
            .join('')}
   </urlset>
 `;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
    return null;
}

export async function getServerSideProps({ res }) {
    // We make an API call to gather the URLs for our site

    const initRequest = await axios.get(API_BASE_URL + "/property/getproperties?limit=50");
    const initRequestData = initRequest;
    let properties = [...initRequestData.data.properties];
    const meta = initRequestData.data.meta;
    console.log(meta);
    for (let i = meta.currentPage; i <= meta.totalPages; i++) {
        const secRequest = await axios.get(API_BASE_URL + "/property/getproperties?limit=50&page=" + i);
        const secRequestData = secRequest;
        properties = [...properties, ...secRequestData.data.properties];
    }
    // We generate the XML sitemap with the posts data
    // console.log(properties)
    const topLinks = await axios.get(API_BASE_URL + "/toplink");
    const blogLinks = await axios.get(API_BASE_URL + '/blog');
    const sitemap = generateSiteMap(properties, topLinks.data, blogLinks.data);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;