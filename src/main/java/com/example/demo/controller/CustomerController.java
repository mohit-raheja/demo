package com.example.demo.controller;

import com.example.demo.entity.Customer;
import com.example.demo.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Customer Management", description = "APIs for managing customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Operation(summary = "Create a new customer", description = "Create a new customer by passing customer details.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Customer created successfully",
                content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = Customer.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content)
    })
    @PostMapping
    public Customer createCustomer(@Valid @RequestBody Customer customer) {
        return customerService.saveCustomer(customer);
    }

    @Operation(summary = "Get all customers", description = "Fetch all customers from the system.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "List of customers fetched successfully",
                content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = Customer.class))),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content)
    })
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }
}
