import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';


const POSTS_URL = 'https://filmhook.annularprojects.com/filmhook-0.1/user/post/getAllUsersPosts';

const Apps = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await axios.get(POSTS_URL, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyTmFtZSI6Im1kZGluZXNoMTA4QGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiSW5kdXN0cnlVc2VyIiwiaWF0IjoxNzE3MjM4MTU2LCJleHAiOjE3MTcyMzkzNTZ9.NuVV5fCDZ_vy5rUP9uaf3AA2vOvcR7tp4SQQUNFFof4w3pJKjAHVG91t6jXuwg4KOmFkEwFYcBKxoj6m6OtpPg',
                },
                params: {
                    page: page,
                    limit: 10,  // Adjust the limit based on your requirements
                },
            });

            if (response.data.status === 1) {
                setPosts(prevPosts => [...prevPosts, ...response.data.data]);
                setPage(prevPage => prevPage + 1);
                setHasMore(response.data.data.length > 0);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderFooter = () => {
        return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
    };

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.postId}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.userName}</Text>
                    <Text>{item.description}</Text>
                    {item.postFiles && item.postFiles.map((file, index) => (
                        <Image key={index} source={{ uri: file.filePath }} style={{ width: 100, height: 100 }} />
                    ))}
                </View>
            )}
            ListFooterComponent={renderFooter}
            onEndReached={fetchPosts}
            onEndReachedThreshold={0.5}
        />
    );
};

export default Apps;
