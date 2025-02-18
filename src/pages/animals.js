import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { useAuth } from '../hooks/useAuth';
import AnimalComponent from '../components/AnimalComponent.js';
import Link from 'next/link';
import SearchHeaderComponent from '@/components/SearchHeaderComponent';
import Sidebar from '../components/Sidebar';
import styles from '@/styles/AnimalDashboard.module.css';

export default function Animals() {
    const { userId, search } = useAuth();
    const [animals, setAnimals] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (userId === -1) {
            router.push("/login");
        }
    }, [userId]);

    useEffect(() => {
        async function getData() {
            const response = await fetch("/api/admin/animals");
            const data = await response.json();
            console.log(data)
            const filteredAnimals = data
                .filter(animal => animal.owner === userId) // Filter by userId
                .filter(animal => animal.name.toLowerCase().startsWith(search.toLowerCase()));
            setAnimals(filteredAnimals);
        }
        if (userId !== -1) {
            getData();
        }
    }, [userId, search]);

    return (
        <div style={{ display: 'flex', flexDirection: "column" }}>
            <SearchHeaderComponent/>
            <div style={{ display: 'flex' }}>
                <Sidebar selected="A"/>
                <main style={{ flex: 1, overflowY: 'auto', maxHeight: '90vh', padding: '20px' }}>
                    <div className={styles.mainHeader}>
                        <h1 className={styles.animalHeading}>Animals</h1>
                        <Link href="/createanimal">+ Create new</Link>
                    </div>
                    <div>
                        {animals == null || animals.length > 0 ? (
                            animals?.map((animal, index) => (
                                <AnimalComponent key={index} animal={animal}/>
                            ))
                        ) : (
                            <div className={styles.noAnimals}>No animals available.</div>
                        )}
                    </div>
                </main>
            </div> 
        </div>
    )
}
