package com.example.taskmanager.service.impl;
import com.example.taskmanager.dto.*;
import com.example.taskmanager.exception.ResourceNotFoundException;
import com.example.taskmanager.model.*;
import com.example.taskmanager.repository.TaskRepository;
import com.example.taskmanager.service.TaskService;
import com.example.taskmanager.spec.TaskSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
@Service @RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    private final TaskRepository repo;
    @Override public TaskResponse create(TaskRequest req) {
        Task task = map(req);
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());
        return map(repo.save(task));
    }
    @Override public TaskResponse get(String id) {
        return repo.findById(id).map(this::map)
                   .orElseThrow(() -> new ResourceNotFoundException("Task", id));
    }
    @Override public Page<TaskResponse> list(String search, String category, String priority, Boolean completed, Pageable pageable) {
        var spec = TaskSpecification.build(
                search,
                category == null ? null : Category.valueOf(category.toUpperCase()),
                priority == null ? null : Priority.valueOf(priority.toUpperCase()),
                completed
        );
        return repo.findAll(spec, pageable).map(this::map);
    }
    @Override public TaskResponse update(String id, TaskRequest req) {
        Task task = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task", id));
        task.setTitle(req.title());
        task.setDescription(req.description());
        task.setCategory(req.category());
        task.setPriority(req.priority());
        task.setDeadline(req.deadline());
        if (req.completed() != null) task.setCompleted(req.completed());
        task.setUpdatedAt(LocalDateTime.now());
        return map(repo.save(task));
    }
    @Override public void delete(String id) {
        if (!repo.existsById(id)) throw new ResourceNotFoundException("Task", id);
        repo.deleteById(id);
    }
    private TaskResponse map(Task t) {
        return new TaskResponse(t.getId(), t.getTitle(), t.getDescription(), t.getCategory(), t.getPriority(), t.getDeadline(),
                t.isCompleted(), t.getCreatedAt().toString(), t.getUpdatedAt().toString());
    }
    private Task map(TaskRequest r) {
        return Task.builder().title(r.title()).description(r.description()).category(r.category()).priority(r.priority())
                   .deadline(r.deadline()).completed(Boolean.TRUE.equals(r.completed())).build();
    }
}
