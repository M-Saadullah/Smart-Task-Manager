package com.example.taskmanager.controller;
import com.example.taskmanager.dto.*;
import com.example.taskmanager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:8081")
public class TaskController {
    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }
    @PostMapping
    public ResponseEntity<TaskResponse> create(@Validated @RequestBody TaskRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }
    @GetMapping("/{id}")
    public TaskResponse get(@PathVariable String id) {
        return service.get(id);
    }
    @GetMapping
    public Page<TaskResponse> list(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) Boolean completed,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "priority,deadline") String sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort.split(",")).ascending());
        return service.list(search, category, priority, completed, pageable);
    }
    @PutMapping("/{id}")
    public TaskResponse update(@PathVariable String id, @Validated @RequestBody TaskRequest dto) {
        return service.update(id, dto);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
