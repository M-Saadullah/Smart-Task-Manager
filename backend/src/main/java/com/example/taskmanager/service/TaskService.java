package com.example.taskmanager.service;
import com.example.taskmanager.dto.TaskRequest;
import com.example.taskmanager.dto.TaskResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
public interface TaskService {
    TaskResponse create(TaskRequest req);
    TaskResponse get(String id);
    Page<TaskResponse> list(String search, String category, String priority, Boolean completed, Pageable pageable);
    TaskResponse update(String id, TaskRequest req);
    void delete(String id);
}
