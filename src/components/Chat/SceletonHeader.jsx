import React from "react"
import ContentLoader from "react-content-loader"

const SceletonHeader = () => (
    <ContentLoader
        speed={2}
        width={400}
        height={32}
        viewBox="0 0 400 32"
        backgroundColor="#828282"
        foregroundColor="#303030"
    >
        <rect x="40" y="8" rx="3" ry="3" width="160" height="13" />
        <circle cx="14" cy="14" r="14" />
    </ContentLoader>
)

export default SceletonHeader