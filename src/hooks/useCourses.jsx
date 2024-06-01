import { useEffect, useState } from "react";


const useCourses = () => {
    const [courses, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:5000/courses')
            .then(res => res.json())
            .then(data => {
                setClasses(data)
                setLoading(false)
            })
    }, [])

    return [courses, loading]
};

export default useCourses;