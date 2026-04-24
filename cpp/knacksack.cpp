// Source: https://www.geeksforgeeks.org/dsa/0-1-knapsack-problem-dp-10/

#include <algorithm>
#include <vector>
#include <emscripten/bind.h>

using std::vector;

int knapsack(int W, const vector<int> &val, const vector<int> &wt) {

    // Initializing dp vector
    vector<int> dp(W + 1, 0);

    // Taking first i elements
    for (int i = 1; i <= wt.size(); i++) {
        
        // Starting from back, so that we also have data of
        // previous computation of i-1 items
        for (int j = W; j >= wt[i - 1]; j--) {
            dp[j] = std::max(dp[j], dp[j - wt[i - 1]] + val[i - 1]);
        }
    }
    return dp[W];
}

EMSCRIPTEN_BINDINGS(knapsack_module) {
    emscripten::register_vector<int>("IntVector");
    emscripten::function("knapsack", &knapsack);
}